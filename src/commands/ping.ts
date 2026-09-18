import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";

const pingCommand: Command = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Répond avec Pong !"),
    execute: async (interaction) => {
        await interaction.reply("Pong ! 🏓");
    },
    cooldown: 10
};

export default pingCommand;