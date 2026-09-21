import { type SelectMenu } from "../../types.js";
import { createQuestionComponents } from "../../entities/index.js";

const personnalityQuestionSelectMenu: SelectMenu = {
    name: /^personnality_question_.*$/g,
    author: false,
    execute: async (interaction) => {
        console.log(interaction.values[0]);
        const questionMatch = interaction.customId.match(/^personnality_question_(\d+)_/);
        const questionNbText = questionMatch?.[1];
        if (questionNbText === undefined) return;

        // Ajouter l'augmentation des traits de personnalité en fonction de la réponse
        // Check si la question n'est pas la max
        //  -> si oui, afficher message fin + faire calcul dieu + proche

        const questionNb = Number(questionNbText) + 1;
        const questionComponents = createQuestionComponents(questionNb, interaction.locale);
        await interaction.update(questionComponents);
    }
};

export default personnalityQuestionSelectMenu;