import { type SelectMenu } from "../../types.js";
import { Personality } from "../../entities/index.js";
import { personalityQuestions } from "../../entities/questions/personality.js";

const personalityQuestionSelectMenu: SelectMenu = {
    name: /^personality_question_(\d+)_(.+)$/,
    author: true,
    execute: async (interaction) => {
        const questionMatch = interaction.customId.match(/^personality_question_(\d+)_(.+)$/);
        const questionNbText = questionMatch?.[1];
        const questionId = questionMatch?.[2];
        const answerId = interaction.values[0];
        if (questionNbText === undefined) return;

        if (Number(questionNbText) + 1 >= personalityQuestions.length) {
            const waitingComponents = Personality.Components.WaitingResult.create(interaction.locale);
            await interaction.update(waitingComponents);
            const closestEntity = Personality.Profile.getClosestEntity(interaction.user.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const resultComponents = Personality.Components.EntityResult.create(closestEntity!, interaction.locale);
            await interaction.editReply(resultComponents);
            return;
        };

        Personality.Profile.addAnswer(interaction.user.id, questionId || 'undefined', answerId || 'undefined');

        const questionNb = Number(questionNbText) + 1;
        const questionComponents = Personality.Components.Question.create(questionNb, interaction.locale);
        await interaction.update(questionComponents);
    }
};

export default personalityQuestionSelectMenu;