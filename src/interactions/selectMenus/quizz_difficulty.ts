import { type SelectMenu } from "../../types.js";
import { Quizz } from "../../entities/index.js";

const quizzSelectDifficultySelectMenu: SelectMenu = {
    name: /^quizz_select_difficulty/,
    author: true,
    execute: async (interaction) => {
        const difficulty = interaction.values[0];
        if (!difficulty) return;
        await Quizz.User.setRandomQuestionsForUser(interaction.user.id, difficulty);
        await interaction.deferUpdate();
        await new Promise(resolve => setTimeout(resolve, 500));
        const questionComponents = Quizz.Components.Question.create(0, interaction.user.id, interaction.locale);
        await interaction.editReply(questionComponents);
    }
};

export default quizzSelectDifficultySelectMenu;