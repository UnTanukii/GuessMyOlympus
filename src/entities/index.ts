import { 
    EmbedBuilder, 
    AttachmentBuilder, 
    APIEmbed, 
    JSONEncodable, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, 
    ActionRowBuilder, 
    Snowflake 
} from "discord.js";

import { getThemeColor } from "../utils/functions.js";
import { t, formatLocale } from "../utils/i18n.js";

import { 
    Entity, 
    PersonalityQuestion, 
    PersonalityAnswer, 
    QuizzAnswer, 
    QuizzQuestion 
} from "../types.js";

import { personalityQuestions } from "./questions/personality.js";
import { quizzQuestions } from "./questions/quizz.js";

import { gods } from "./gods.js";
import { heroes } from "./heroes.js";
import { monsters } from "./monsters.js";

const userPersonalities = new Map<string, Record<string, number>>();

export const Personality = {
    Entities: {
        all: [...gods, ...heroes, ...monsters] as Entity[],
        map: new Map<string, Entity>([...gods, ...heroes, ...monsters].map(e => [e.id, e])),

        getById(id: string): Entity | undefined {
            return this.map.get(id);
        }
    },

    Questions: {
        all: personalityQuestions,

        findById(id: string): PersonalityQuestion | undefined {
            return this.all.find(q => q.id === id);
        },

        findAnswer(question: PersonalityQuestion, answerId: string): PersonalityAnswer | undefined {
            return question.answers.find(a => a.id === answerId);
        }
    },

    Profile: {
        addAnswer(userId: Snowflake, questionId: string, answerId: string) {
            const question = Personality.Questions.findById(questionId);
            if (!question) {
                throw new Error(`Question with ID ${questionId} not found`);
            }

            const answer = Personality.Questions.findAnswer(question, answerId);
            if (!answer) {
                throw new Error(`Answer with ID ${answerId} not found for question ${questionId}`);
            }

            const userProfile = userPersonalities.get(userId) || {};
            
            for (const [trait, change] of Object.entries(answer.changes)) {
                if (change !== undefined) {
                    userProfile[trait] = (userProfile[trait] || 0) + change;
                }
            }
            userPersonalities.set(userId, userProfile);
        },

        getClosestEntity(userId: Snowflake): Entity | undefined {
            const userProfile = userPersonalities.get(userId);
            if (!userProfile) return undefined;

            let closestEntity = Personality.Entities.all[0];
            let closestDistance = Infinity;

            for (const entity of Personality.Entities.all) {
                let distance = 0;
                for (const trait in entity.personality) {
                    const entityTrait = entity.personality[trait as keyof typeof entity.personality];
                    const userTrait = userProfile[trait] || 0;
                    distance += Math.pow(entityTrait - userTrait, 2);
                }
                distance = Math.sqrt(distance);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEntity = entity;
                }
            }
            return closestEntity;
        }
    },

    Components: {
        Question: {
            create(index: number, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const question = Personality.Questions.all[index];
                if (!question) {
                    throw new Error("No questions available.");
                }

                const answerSelect = new StringSelectMenuBuilder()
                    .setCustomId(`personality_question_${index}_${question.id}`)
                    .setPlaceholder(t(loc, "personality.fields.answer_placeholder"))
                    .addOptions(
                        question.answers.map(answer => 
                            new StringSelectMenuOptionBuilder()
                                .setLabel(t(loc, `personality.fields.answer`, { answer: answer.id.split('.')[1]?.toUpperCase() || '' }))
                                .setDescription(t(loc, `personality.answers.${answer.id}`))
                                .setValue(answer.id)
                        )
                    );

                const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(answerSelect);
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(`${index + 1}/${Personality.Questions.all.length} - ${t(loc, `personality.questions.${question.id}`)}`);

                return { embeds: [embed], components: [row] };
            }
        },

        WaitingResult: {
            create(locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setDescription(t(loc, 'personality.fields.waiting_result'));

                return { embeds: [embed], components: [] };
            }
        },

        EntityResult: {
            create(entity: Entity, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], files: AttachmentBuilder[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const cardImage = new AttachmentBuilder(`./src/assets/entities/${entity.id}.png`, { name: `${entity.id}.png` });
                
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(t(loc, `entities.${entity.id}.name`))
                    .setDescription(t(loc, `personality.fields.result`, { 
                        entityName: t(loc, `entities.${entity.id}.name`), 
                        entityDescription: t(loc, `entities.${entity.id}.description`) 
                    }))
                    .setImage(`attachment://${entity.id}.png`)
                    .setFooter({ text: t(loc, "personality.fields.result_footer") });

                return { embeds: [embed], files: [cardImage], components: [] };
            }
        }
    }
};

export const Quizz = {
    Questions: {
        all: quizzQuestions,

        findById(id: string): QuizzQuestion | undefined {
            return this.all.find(q => q.id === id);
        },

        findAnswer(question: QuizzQuestion, answerId: string): QuizzAnswer | undefined {
            return question.answers.find(a => a.id === answerId);
        }
    },
};