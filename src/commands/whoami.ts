import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";
import { getLocalizedCommand, getDefaultCommand } from "../utils/i18n.js";
import { Personality } from "../entities/index.js";

const whoamiCommand: Command = {
    command: new SlashCommandBuilder()
        .setName(getDefaultCommand("whoami", "name"))
        .setNameLocalizations(getLocalizedCommand("whoami", "name"))
        .setDescription(getDefaultCommand("whoami", "description"))
        .setDescriptionLocalizations(getLocalizedCommand("whoami", "description")),
    execute: async (interaction) => {
        if (!interaction.inCachedGuild()) {
            return;
        }
        const questionComponents = Personality.Components.Question.create(0, interaction.locale);
        return interaction.reply(questionComponents);
    },
    cooldown: 60
};

export default whoamiCommand;