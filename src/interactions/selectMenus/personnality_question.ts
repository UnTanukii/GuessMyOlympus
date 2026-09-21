import { type SelectMenu } from "../../types.js";
import { createEntityResultComponents, createWaitingResultComponents, createQuestionComponents, calculateQuestionChanges, calculateClosestEntity } from "../../entities/index.js";
import { personnalityQuestions } from "../../entities/questions.js";

const personnalityQuestionSelectMenu: SelectMenu = {
    name: /^personnality_question_(\d+)_(.+)$/,
    author: false,
    execute: async (interaction) => {
        const questionMatch = interaction.customId.match(/^personnality_question_(\d+)_(.+)$/);
        const questionNbText = questionMatch?.[1];
        const questionId = questionMatch?.[2];
        const answerId = interaction.values[0];
        if (questionNbText === undefined) return;

        if (Number(questionNbText) + 1 >= personnalityQuestions.length) {
            const waitingComponents = createWaitingResultComponents(interaction.locale);
            await interaction.update(waitingComponents);
            const closestEntity = calculateClosestEntity(interaction.user.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const resultComponents = createEntityResultComponents(closestEntity!, interaction.locale);
            await interaction.editReply(resultComponents);
            return;
        };

        calculateQuestionChanges(interaction.user.id, questionId || 'undefined', answerId || 'undefined');

        const questionNb = Number(questionNbText) + 1;
        const questionComponents = createQuestionComponents(questionNb, interaction.locale);
        await interaction.update(questionComponents);
    }
};

export default personnalityQuestionSelectMenu;