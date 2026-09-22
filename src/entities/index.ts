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
    QuizzQuestion,
    QuizzAnswer,
} from "../types.js";
import { quizzQuestionDifficulties, quizzQuestionDifficultyEmojis, quizzQuestionCount } from "../constants.js";

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
                throw new Error(`Question with ID ${questionId} not found (Personality.Profile.addAnswer)`);
            }

            const answer = Personality.Questions.findAnswer(question, answerId);
            if (!answer) {
                throw new Error(`Answer with ID ${answerId} not found for question ${questionId} (Personality.Profile.addAnswer)`);
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
            create(questionId: number, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const question = Personality.Questions.all[questionId];
                if (!question) {
                    throw new Error("No questions available. (Personality.Components.Question.create)");
                }

                const answerSelect = new StringSelectMenuBuilder()
                    .setCustomId(`personality_question_${questionId}_${question.id}`)
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
                    .setTitle(`${questionId + 1}/${Personality.Questions.all.length} - ${t(loc, `personality.questions.${question.id}`)}`);

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

const userQuizzQuestions = new Map<string, string>();
const userQuizzScore = new Map<string, number>();
export const Quizz = {
    Questions: {
        all: quizzQuestions,

        findById(id: string): QuizzQuestion | undefined {
            return this.all.find(q => q.id === id);
        },

        findAnswer(question: QuizzQuestion, answerId: string): QuizzAnswer | undefined {
            return question.answers.find(a => a.id === answerId);
        },

        findAnswerById(answerId: string): QuizzAnswer | undefined {
            for (const question of this.all) {
                const answer = question.answers.find(a => a.id === answerId);
                if (answer) return answer;
            }
            return undefined;
        },

        findByDifficulty(difficulty: string): QuizzQuestion[] {
            if (difficulty === 'all') return this.all;
            return this.all.filter(q => q.difficulty === difficulty);
        },

        getRandomQuestions(difficulty: string): QuizzQuestion[] {
            const questions = [...this.findByDifficulty(difficulty)];
            if (questions.length === 0) return [];
            const randomQuestions: QuizzQuestion[] = [];
            for (let i = 0; i < quizzQuestionCount && questions.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                const [question] = questions.splice(randomIndex, 1);
                if (question) randomQuestions.push(question);
            }
            return randomQuestions;
        }
    },

    User: {
        async setRandomQuestionsForUser(userId: Snowflake, difficulty: string): Promise<QuizzQuestion[]> {
            const questions = Quizz.Questions.getRandomQuestions(difficulty);
            if (questions.length === 0) return [];
            userQuizzQuestions.set(userId, questions.map(q => q.id).join(','));
            userQuizzScore.set(userId, 0);
            return questions;
        },

        getQuestionsForUser(userId: Snowflake): QuizzQuestion[] {
            const questionIds = userQuizzQuestions.get(userId);
            if (!questionIds) return [];
            const idsArray = questionIds.split(',');
            return idsArray.map(id => Quizz.Questions.findById(id)).filter(q => q !== undefined) as QuizzQuestion[];
        }
    },

    Score: {
        addScore(userId: Snowflake, score: number) {
            const currentScore = userQuizzScore.get(userId) || 0;
            userQuizzScore.set(userId, currentScore + score);
        },

        getScore(userId: Snowflake): number {
            return userQuizzScore.get(userId) || 0;
        }
    },

    Components: {
        SelectDifficulty: {
            create(locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const difficultySelect = new StringSelectMenuBuilder()
                    .setCustomId(`quizz_select_difficulty`)
                    .setPlaceholder(t(loc, "quizz.fields.select_difficulty_placeholder"))
                    .addOptions(
                        quizzQuestionDifficulties.map(difficulty => 
                            new StringSelectMenuOptionBuilder()
                                .setLabel(t(loc, `quizz.fields.${difficulty}`))
                                .setEmoji(quizzQuestionDifficultyEmojis[difficulty])
                                .setValue(difficulty)
                        )
                    );

                const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(difficultySelect);
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(t(loc, "quizz.fields.select_difficulty_title"));

                return { embeds: [embed], components: [row] };
            }
        },

        Result: {
            create(questionId: number, isCorrect: boolean, correctAnswerId: string, userId: Snowflake, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const questionsForUser = Quizz.User.getQuestionsForUser(userId);
                const question = questionsForUser[questionId];
                if (!question) {
                    throw new Error("No questions available. (Quizz.Components.Result.create)");
                }

                const visualQuestionId = questionId + 1;
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(`${visualQuestionId}/${questionsForUser.length} - ${t(loc, `quizz.questions.${question.id}`)} ${quizzQuestionDifficultyEmojis[question.difficulty]}`)
                    .setDescription(isCorrect ? t(loc, "quizz.fields.correct_answer") : t(loc, "quizz.fields.incorrect_answer", { correctAnswerLetter: correctAnswerId.split('.')[1]?.toUpperCase() || 'N/A', correctAnswerString: t(loc, `quizz.answers.${correctAnswerId}`) }))
                    .setFooter({ text: t(loc, "quizz.fields.current_score", { score: Quizz.Score.getScore(userId), total: visualQuestionId }) });

                return { embeds: [embed], components: [] };
            }
        },

        Question: {
            create(questionId: number, userId: Snowflake, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const questionsForUser = Quizz.User.getQuestionsForUser(userId);
                const question = questionsForUser[questionId];
                if (!question) {
                    throw new Error("No questions available. (Quizz.Components.Question.create)");
                }

                const answerSelect = new StringSelectMenuBuilder()
                    .setCustomId(`quizz_question_${questionId}_${question.id}`)
                    .setPlaceholder(t(loc, "quizz.fields.answer_placeholder"))
                    .addOptions(
                        question.answers.map(answer => 
                            new StringSelectMenuOptionBuilder()
                                .setLabel(t(loc, `quizz.fields.answer`, { answer: answer.id.split('.')[1]?.toUpperCase() || '' }))
                                .setDescription(t(loc, `quizz.answers.${answer.id}`))
                                .setValue(answer.id)
                        )
                    );

                const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(answerSelect);
                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(`${questionId + 1}/${questionsForUser.length} - ${t(loc, `quizz.questions.${question.id}`)} ${quizzQuestionDifficultyEmojis[question.difficulty]}`)
                    .setFooter({ text: t(loc, "quizz.fields.current_score", { score: Quizz.Score.getScore(userId), total: questionId }) });

                return { embeds: [embed], components: [row] };
            }
        },

        FinalScore: {
            create(userId: Snowflake, locale: string): { embeds: APIEmbed[] | JSONEncodable<APIEmbed>[], components: ActionRowBuilder<StringSelectMenuBuilder>[] } {
                const loc = formatLocale(locale);
                const finalScore = Quizz.Score.getScore(userId);
                const totalQuestions = Quizz.User.getQuestionsForUser(userId).length;

                let resultText = '';
                switch (true) {
                    case finalScore === totalQuestions:
                        resultText = t(loc, "quizz.fields.final_score_perfect");
                        break;
                    case finalScore >= totalQuestions / 2:
                        resultText = t(loc, "quizz.fields.final_score_more_half");
                        break;
                    case finalScore < totalQuestions / 2:
                        resultText = t(loc, "quizz.fields.final_score_less_half");
                        break;
                }

                const embed = new EmbedBuilder()
                    .setColor(getThemeColor("text"))
                    .setTitle(t(loc, "quizz.fields.final_score_title"))
                    .setDescription(t(loc, "quizz.fields.final_score_description", { score: finalScore, total: totalQuestions, finalMessage: resultText }));

                return { embeds: [embed], components: [] };
            }
        },
    }
};