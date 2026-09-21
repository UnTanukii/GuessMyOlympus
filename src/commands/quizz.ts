import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";
import { getLocalizedCommand, getDefaultCommand } from "../utils/i18n.js";
import { Quizz } from "../entities/index.js";

const quizzCommand: Command = {
    command: new SlashCommandBuilder()
        .setName(getDefaultCommand("quizz", "name"))
        .setNameLocalizations(getLocalizedCommand("quizz", "name"))
        .setDescription(getDefaultCommand("quizz", "description"))
        .setDescriptionLocalizations(getLocalizedCommand("quizz", "description")),
    execute: async (interaction) => {
        if (!interaction.inCachedGuild()) {
            return;
        }
        const selectDifficultyComponent = Quizz.Components.SelectDifficulty.create(interaction.locale);
        return interaction.reply(selectDifficultyComponent);
    },
    cooldown: 60
};

export default quizzCommand;