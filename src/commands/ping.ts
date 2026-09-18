import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";
import { createCardEmbed, getCardById } from "../cards/index.js";

const pingCommand: Command = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Répond avec Pong !"),
    execute: async (interaction) => {
        const card = getCardById("zeus");
        if (!card) {
            await interaction.reply("Carte non trouvée.");
            return;
        }
        const cardEmbed = createCardEmbed(card, "fr");
        await interaction.reply({ embeds: [cardEmbed] });
    },
    cooldown: 10
};

export default pingCommand;