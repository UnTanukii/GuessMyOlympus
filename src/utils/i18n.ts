import { init, getFixedT } from "i18next";
import fr from "../locales/fr.json" with { type: "json" };
import en from "../locales/fr.json" with { type: "json" };

const defaultLanguage = "fr";
const resources = {
    fr: { translation: fr },
    'en-US': { translation: en },
    'en-GB': { translation: en }
}

export type TSupportedLanguages = keyof typeof resources;
export const supportedLanguages = Object.keys(resources) as TSupportedLanguages[];
export async function initI18n() {
    await init({
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        resources,
        interpolation: {
            escapeValue: false
        }
    });
    console.log("-> i18n initialized");
};

export function formatLocale(locale: string): TSupportedLanguages {
    const formattedLocale = locale as TSupportedLanguages;
    if (!supportedLanguages.includes(formattedLocale)) {
        console.warn(`Locale ${locale} is not supported. Falling back to default language.`);
        return defaultLanguage;
    }
    return formattedLocale;
};

export function t(locale: TSupportedLanguages, key: string, options?: Record<string, unknown>) {
    const fixedT = getFixedT(locale);
    return fixedT(key, options);
};

export type CommandElement = "description" | "name";
export function getDefaultCommand(command: string, element: CommandElement, options?: Record<string, unknown>): string {
    return t(defaultLanguage, `commands.${command}.${element}`, options);
};
export function getLocalizedCommand(command: string, element: CommandElement, options?: Record<string, unknown>): Record<TSupportedLanguages, string> {
    return Object.fromEntries(
        supportedLanguages.map(locale => [
            locale,
            t(locale, `commands.${command}.${element}`, options)
        ])
    ) as Record<TSupportedLanguages, string>;
};