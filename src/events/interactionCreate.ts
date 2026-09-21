import { type Interaction } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { type BotEvent, type SelectMenu } from "../types";
import { getDirname } from "../utils/functions.js";

const event : BotEvent = {
    name: "interactionCreate",
    execute: async (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command = interaction.client.commands.get(interaction.commandName)
            let cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`)
            if (!command) return;
            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    const remainingTime = Math.floor(Math.abs(Date.now() - cooldown) / 1000);
                    interaction.reply({ content: interaction.client.translate(interaction.locale, "errors.cmd_cooldown", { time: remainingTime }), ephemeral: true })
                    setTimeout(() => interaction.deleteReply(), 5000)
                    return
                }
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
                setTimeout(() => {
                    interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.username}`)
                }, command.cooldown * 1000)
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
            }
            command.execute(interaction)
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                if(!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isModalSubmit()) {
            const command = interaction.client.commands.get(interaction.customId);
            if (!command) {
                console.error(`No command matching ${interaction.customId} was found.`);
                return;
            }
            try {
                if(!command.modal) return;
                command.modal(interaction);
            } catch (error) {
                console.error(error);
            }
        } else if (interaction.isStringSelectMenu()) {
            const selectMenusDir = join(getDirname(import.meta.url), "../interactions/selectMenus");
            const selectMenuFiles = readdirSync(selectMenusDir)
                .filter(file => (file.endsWith(".js") || file.endsWith(".ts")) && !file.endsWith(".d.ts"));

            for (const file of selectMenuFiles) {
                const filePath = join(selectMenusDir, file);
                const selectMenuModule = await import(pathToFileURL(filePath).href);
                const interactionFile: SelectMenu = selectMenuModule.default;
                const selectMenuPattern = interactionFile.name;
                if (selectMenuPattern instanceof RegExp) selectMenuPattern.lastIndex = 0;
                const match = selectMenuPattern instanceof RegExp ? selectMenuPattern.exec(interaction.customId) : selectMenuPattern === interaction.customId ? [interaction.customId] : null;

                if (!match) continue;
                if (interactionFile.author && interaction.user.id !== interaction.message.interactionMetadata?.user.id) {
                    await interaction.reply({ content: interaction.client.translate(interaction.locale, "errors.int_not_author"), ephemeral: true });
                    return;
                }

                try {
                    await interactionFile.execute(interaction, ...match.slice(1));
                } catch (error) {
                    console.error(error);
                }
                return;
            }
        }
    }
}

export default event;