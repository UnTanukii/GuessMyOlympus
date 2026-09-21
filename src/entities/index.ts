import { EmbedBuilder, AttachmentBuilder, APIEmbed, JSONEncodable, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, Snowflake } from "discord.js";
import { getThemeColor } from "../utils/functions.js";
import { t, formatLocale } from "../utils/i18n.js";
import { Entity, PersonnalityQuestion } from "../types.js";
import { personnalityQuestions } from "./questions.js";
import { gods } from "./gods.js";
import { heroes } from "./heroes.js";
import { monsters } from "./monsters.js";

export const entities: Entity[] = [...gods, ...heroes, ...monsters];

export const entitiesMap = new Map<string, Entity>(
    entities.map(entity => [entity.id, entity])
);

export function getEntityById(id: string): Entity | undefined {
    return entitiesMap.get(id);
};

export function createWaitingResultComponents(locale: string): { embeds: JSONEncodable<APIEmbed>[], components: any[] } {
    const formattedLocale = formatLocale(locale);
    const cardEmbed = new EmbedBuilder()
        .setColor(getThemeColor("text"))
        .setDescription(t(formattedLocale, 'personnality.fields.waiting_result'));
    return { embeds: [cardEmbed], components: [] };
};

export function createEntityResultComponents(entity: Entity, locale: string): { embeds: JSONEncodable<APIEmbed>[], files: AttachmentBuilder[], components: any[] } {
    const formattedLocale = formatLocale(locale);
    const cardImage = new AttachmentBuilder(`./src/assets/entities/${entity.id}.png`, { name: `${entity.id}.png` });
    const cardEmbed = new EmbedBuilder()
        .setColor(getThemeColor("text"))
        .setTitle(t(formattedLocale, `entities.${entity.id}.name`))
        .setDescription(t(formattedLocale, `personnality.fields.result`, { entityName: t(formattedLocale, `entities.${entity.id}.name`), entityDescription: t(formattedLocale, `entities.${entity.id}.description`) }))
        .setImage(`attachment://${entity.id}.png`)
        .setFooter({ text: t(formattedLocale, "personnality.fields.result_footer") });
    return { embeds: [cardEmbed], files: [cardImage], components: [] };
};

export function findQuestionById(id: string): PersonnalityQuestion | undefined {
    return personnalityQuestions.find(question => question.id === id);
};

export function findAnswerById(question: PersonnalityQuestion, answerId: string) {
    return question.answers.find(answer => answer.id === answerId);
};

const usersProfiles = new Map<string, { [key: string]: number }>();
export function calculateQuestionChanges(userId: Snowflake, questionId: string, answerId: string) {
    const question = findQuestionById(questionId);
    if (!question) {
        throw new Error(`Question with ID ${questionId} not found`);
    }
    const answer = findAnswerById(question, answerId);
    if (!answer) {
        throw new Error(`Answer with ID ${answerId} not found for question ${question.id}`);
    };
    usersProfiles.set(userId, usersProfiles.get(userId) || {});
    const userProfile = usersProfiles.get(userId)!;
    for (const [trait, change] of Object.entries(answer.changes)) {
        if (change !== undefined) {
            userProfile[trait] = (userProfile[trait] || 0) + change;
        };
    };
    return;
};

export function calculateClosestEntity(userId: Snowflake): Entity | undefined {
    const userProfile = usersProfiles.get(userId);
    if (!userProfile) {
        return undefined;
    };

    let closestEntity = entities[0];
    let closestDistance = Infinity;

    for (const entity of entities) {
        let distance = 0;

        for (const trait in entity.personnality) {
            const entityTraitValue = entity.personnality[trait as keyof typeof entity.personnality];
            const userTraitValue = userProfile[trait] || 0;
            distance += Math.pow(entityTraitValue - userTraitValue, 2);
        };
        distance = Math.sqrt(distance);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestEntity = entity;
        };
    };
    return closestEntity;
};

export function createQuestionComponents(questionNb: number, locale: string): { embeds: JSONEncodable<APIEmbed>[]; components: any[] } {
    const formattedLocale = formatLocale(locale);
    const question = personnalityQuestions[questionNb];
    if (!question) {
        throw new Error("No questions available.");
    };

    const answerSelect = new StringSelectMenuBuilder()
        .setCustomId(`personnality_question_${questionNb}_${question.id}`)
        .setPlaceholder(t(formattedLocale, "personnality.fields.answer_placeholder"))
        .addOptions(
            question.answers.map(answer => 
                new StringSelectMenuOptionBuilder()
                    .setLabel(t(formattedLocale, `personnality.fields.answer`, { answer: answer.id.split('.')[1]?.toUpperCase() || '' }))
                    .setDescription(t(formattedLocale, `personnality.answers.${answer.id}`))
                    .setValue(answer.id),
            )
        )
    const row = new ActionRowBuilder().addComponents(answerSelect);

    const questionEmbed = new EmbedBuilder()
        .setColor(getThemeColor("text"))
        .setTitle(`${questionNb + 1}/${personnalityQuestions.length} - ${t(formattedLocale, `personnality.questions.${question.id}`)}`);
    return { embeds: [questionEmbed], components: [row] };
};