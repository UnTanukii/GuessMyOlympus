import { type SelectMenu } from "../../types.js";
import { Quizz } from "../../entities/index.js";

const quizzQuestionsSelectMenu: SelectMenu = {
    name: /^quizz_question_(\d+)_(.+)$/,
    author: true,
    execute: async (interaction) => {
        const questionMatch = interaction.customId.match(/^quizz_question_(\d+)_(.+)$/);
        const questionNbText = questionMatch?.[1];
        const questionId = questionMatch?.[2];
        const answerId = interaction.values[0];
        if (questionNbText === undefined || questionId === undefined || answerId === undefined) return;
        const questionNb = Number(questionNbText);

        const answerData = Quizz.Questions.findAnswerById(answerId || 'undefined');
        const correctAnswerId = Quizz.Questions.findById(questionId)?.answers.find(a => a.valid)?.id;
        if (answerData && answerData.valid) {
            Quizz.Score.addScore(interaction.user.id, 1);
            const resultComponents = Quizz.Components.Result.create(questionNb, true, correctAnswerId || 'undefined', interaction.user.id, interaction.locale);
            await interaction.update(resultComponents);
        }else {
            const resultComponents = Quizz.Components.Result.create(questionNb, false, correctAnswerId || 'undefined', interaction.user.id, interaction.locale);
            await interaction.update(resultComponents);
        };

        await new Promise(resolve => setTimeout(resolve, 2000));

        const questionsForUser = Quizz.User.getQuestionsForUser(interaction.user.id);
        if (Number(questionNbText) + 1 >= questionsForUser.length) {
            const finalScoreComponents = Quizz.Components.FinalScore.create(interaction.user.id, interaction.locale);
            await interaction.editReply(finalScoreComponents);
            return;
        };

        const questionComponents = Quizz.Components.Question.create(questionNb + 1, interaction.user.id, interaction.locale);
        await interaction.editReply(questionComponents);
    }
};

export default quizzQuestionsSelectMenu;