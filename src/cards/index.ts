import { EmbedBuilder, AttachmentBuilder, APIEmbed, JSONEncodable } from "discord.js";
import { getRarityColor } from "../utils/functions.js";
import { t } from "../utils/i18n.js";
import { Card } from "../types";
import { gods } from "./gods.js";

export const cards: Card[] = [...gods];

export const cardsMap = new Map<string, Card>(
    cards.map(card => [card.id, card])
);

export function getCardById(id: string): Card | undefined {
    return cardsMap.get(id);
};

export function createCardEmbed(card: Card, locale: string): JSONEncodable<APIEmbed> {
    const cardImage = new AttachmentBuilder(`./src/assets/cards/${card.id}.png`, { name: `${card.id}.png` });
    const cardEmbed = new EmbedBuilder()
        .setColor(getRarityColor(card.rarity))
        .setTitle(t(locale, `cards.${card.id}.name`))
        .setDescription(t(locale, `cards.${card.id}.description`))
        .setImage(`attachment://${card.id}.png`)
        .addFields(
            { name: t(locale, "cards.fields.rarity"), value: t(locale, `cards.rarity.${card.rarity}`), inline: false },
            { name: t(locale, "cards.fields.type"), value: t(locale, `cards.type.${card.type}`), inline: false },
            { name: t(locale, "cards.fields.location"), value: t(locale, `cards.location.${card.location}`), inline: false }
        );
    return cardEmbed;
}