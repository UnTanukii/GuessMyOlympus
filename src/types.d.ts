import { SlashCommandBuilder, Collection, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"

export interface Command {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_ENV: string,
            DISCORD_TOKEN: string,
            CLIENT_ID: string,
            DEVELOPMENT_GUILD_ID: string,
            DB_AUTH: string,
        }
    }
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>
        cooldowns: Collection<string, number>
    }
}