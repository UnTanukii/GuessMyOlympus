import { SlashCommandBuilder, Collection, AutocompleteInteraction, ChatInputCommandInteraction, StringSelectMenuInteraction } from "discord.js"

export interface Command {
    command: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
    cooldown?: number // in seconds
};

export interface SelectMenu {
    name: RegExp | string,
    author?: boolean,
    execute: (interaction: StringSelectMenuInteraction, ...parameters: string[]) => void | Promise<void>
};

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args?) => void
};


export type EntityType = "god" | "hero" | "monster";
export interface Entity {
    id: string, 
    type: EntityType,
    personnality: {
        authority: number,
        logic: number,
        impulsivity: number,
        sociability: number,
        independence: number,
        mischief: number,
        creativity: number,
        empathyProtection: number
    }
};

export interface PersonnalityAnswer {
    id: string, 
    changes: {
        authority?: number,
        logic?: number,
        impulsivity?: number,
        sociability?: number,
        independence?: number,
        mischief?: number,
        creativity?: number,
        empathyProtection?: number
    }
};

export interface PersonnalityQuestion {
    id: string, 
    answers: PersonnalityAnswer[]
};

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
};

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>
        cooldowns: Collection<string, number>
        translate: (locale: TSupportedLanguages, key: string, options?: Record<string, unknown>) => string
    }
};