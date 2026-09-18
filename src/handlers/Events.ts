import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { type BotEvent } from "../types";
import { getDirname } from "../utils/functions.js";

export default async (client: Client) => {
    const eventsDir = join(getDirname(import.meta.url), "../events")
    const eventFiles = readdirSync(eventsDir).filter(file => file.endsWith(".js") || file.endsWith(".ts") && !file.endsWith(".d.ts"));

    for (const file of eventFiles) {
        const filePath = join(eventsDir, file);

        const eventModule = await import(pathToFileURL(filePath).href);
        const event: BotEvent = eventModule.default;

        if (!event?.name || typeof event.execute !== "function") {
            console.warn(`Event ignored (${file}) : 'name' or 'execute' missing`);
            continue;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        console.log(`- Loaded event ${event.name}`);
    }
}