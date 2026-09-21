import { EmbedBuilder, AttachmentBuilder, APIEmbed, JSONEncodable, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";
import { getThemeColor } from "../utils/functions.js";
import { t, TSupportedLanguages, formatLocale } from "../utils/i18n.js";
import { Entity } from "../types.js";
import { gods } from "./gods.js";
import { personnalityQuestions } from "./questions.js";

export const entities: Entity[] = [...gods];

export const entitiesMap = new Map<string, Entity>(
    entities.map(entity => [entity.id, entity])
);

export function getEntityById(id: string): Entity | undefined {
    return entitiesMap.get(id);
};

export function createEntityComponents(entity: Entity, locale: string): { embeds: JSONEncodable<APIEmbed>[]; files: AttachmentBuilder[] } {
    const formattedLocale = formatLocale(locale);
    const cardImage = new AttachmentBuilder(`./src/assets/entities/${entity.id}.png`, { name: `${entity.id}.png` });
    const cardEmbed = new EmbedBuilder()
        .setColor(getThemeColor("text"))
        .setTitle(t(formattedLocale, `entities.${entity.id}.name`))
        .setDescription(t(formattedLocale, `entities.${entity.id}.description`))
        .setImage(`attachment://${entity.id}.png`)
        .addFields(
            { name: t(formattedLocale, "entities.fields.type"), value: t(formattedLocale, `entities.type.${entity.type}`), inline: false },
        );
    return { embeds: [cardEmbed], files: [cardImage] };
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
        .setTitle(`#${questionNb + 1} - ${t(formattedLocale, `personnality.questions.${question.id}`)}`);
    return { embeds: [questionEmbed], components: [row] };
};