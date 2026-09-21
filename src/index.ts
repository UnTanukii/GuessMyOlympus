import { Client, GatewayIntentBits, Collection } from "discord.js";
import { type Command } from "./types";
import { getDirname } from "./utils/functions.js";
import { initI18n, t, TSupportedLanguages } from "./utils/i18n.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";

config();
initI18n();

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})

client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()
client.translate = (locale: TSupportedLanguages, key: string, options?: Record<string, unknown>) => t(locale, key, options);

const handlersDir = join(getDirname(import.meta.url), "./handlers");
const handlerFiles = readdirSync(handlersDir).filter(file => file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts"));

for (const file of handlerFiles) {
    const filePath = join(handlersDir, file);
    
    const handlerModule = await import(pathToFileURL(filePath).href);
    const handler = handlerModule.default ?? handlerModule;

    if (typeof handler === "function") {
        await handler(client);
    }
}

client.login(process.env.DISCORD_TOKEN)