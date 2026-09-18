import { init, getFixedT } from "i18next";
import fr from "../locales/fr.json" with { type: "json" };

export async function initI18n() {
    await init({
        lng: "fr",
        fallbackLng: "fr",
        resources: {
            fr: { translation: fr }
        },
        interpolation: {
            escapeValue: false
        }
    });
    console.log("-> i18n initialized");
};

export function t(locale: string, key: string, options?: Record<string, unknown>) {
    const fixedT = getFixedT(locale);
    return fixedT(key, options);
};