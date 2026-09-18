import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { type Command } from "../types";
import { getDirname } from "../utils/functions.js";

export default async (client: Client) => {
    const commands : SlashCommandBuilder[] = []

    const commandsDir = join(getDirname(import.meta.url),"../commands")
    const commandFiles = readdirSync(commandsDir).filter(file => file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts"));

    for (const file of commandFiles) {
        const filePath = join(commandsDir, file);
        
        const commandModule = await import(pathToFileURL(filePath).href);
        const commandInfo: Command = commandModule.default;

        if (commandInfo?.command) {
            commands.push(commandInfo.command);
            client.commands.set(commandInfo.command.name, commandInfo);
        }
    }

    if (!process.env.CLIENT_ID || !process.env.DISCORD_TOKEN) {
        console.error("- CLIENT_ID/DISCORD_TOKEN missing in .env");
        return;
    };

    let route = Routes.applicationCommands(process.env.CLIENT_ID);
    if(process.env.APP_ENV == "development"){
        route = Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.DEVELOPMENT_GUILD_ID);
    };

    const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

    try {
        const data = await rest.put(route, {
            body: commands.map(command => command.toJSON())
        }) as any[];

        console.log(`- Loaded ${data.length} command(s)`);
    } catch (error) {
        console.error(error);
    }
}