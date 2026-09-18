import { Client } from "discord.js";
import { type BotEvent } from "../types";

const event : BotEvent = {
    name: "clientReady",
    once: true,
    execute: (client : Client) => {
        console.log(`-> Logged in as ${client.user?.tag}`)
    }
}

export default event;