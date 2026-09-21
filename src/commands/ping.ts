import { SlashCommandBuilder } from "discord.js";
import { type Command } from "../types.js";
import { createEntityComponents, getEntityById } from "../entities/index.js";
import { getLocalizedCommand, getDefaultCommand } from "../utils/i18n.js";

const pingCommand: Command = {
    command: new SlashCommandBuilder()
        .setName(getDefaultCommand("ping", "name"))
        .setNameLocalizations(getLocalizedCommand("ping", "name"))
        .setDescription(getDefaultCommand("ping", "description"))
        .setDescriptionLocalizations(getLocalizedCommand("ping", "description")),
    execute: async (interaction) => {
        const card = getEntityById("hades");
        if (!card) {
            await interaction.reply("Entité non trouvée.");
            return;
        }
        const cardComponents = createEntityComponents(card, "fr");
        await interaction.reply(cardComponents);
    },
    cooldown: 10
};

export default pingCommand;