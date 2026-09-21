import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";
import { Personality } from "../entities/index.js";
import { getLocalizedCommand, getDefaultCommand } from "../utils/i18n.js";

const pingCommand: Command = {
    command: new SlashCommandBuilder()
        .setName(getDefaultCommand("ping", "name"))
        .setNameLocalizations(getLocalizedCommand("ping", "name"))
        .setDescription(getDefaultCommand("ping", "description"))
        .setDescriptionLocalizations(getLocalizedCommand("ping", "description")),
    execute: async (interaction) => {
        const card = Personality.Entities.getById("hades");
        if (!card) {
            await interaction.reply("Entité non trouvée.");
            return;
        }
        const cardComponents = Personality.Components.EntityResult.create(card, "fr");
        await interaction.reply(cardComponents);
    },
    cooldown: 10
};

export default pingCommand;