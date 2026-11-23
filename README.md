# GuessMyOlympus

Bot Discord sur le thème de la mythologie grecque, écrit en TypeScript avec [discord.js](https://discord.js.org/).

## Fonctionnalités

| Commande  | Description |
|-----------|-------------|
| `/whoami` | Test de personnalité : réponds aux questions et découvre quelle entité de l'Olympe tu es (dieu, héros ou monstre). |
| `/quizz`  | Quiz de culture sur la mythologie grecque, avec choix de la difficulté (facile, moyen, difficile, expert, tout). |
| `/ping`   | Commande de test. |

Le bot est localisé en français et en anglais (`src/locales/`).

## Prérequis

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/)
- Une application Discord avec un bot ([Discord Developer Portal](https://discord.com/developers/applications))

## Installation

```bash
git clone https://github.com/UnTanukii/GuessMyOlympus.git
cd GuessMyOlympus
pnpm install
cp .env.example .env
```

Remplis ensuite `.env` :

| Variable               | Description |
|------------------------|-------------|
| `DISCORD_TOKEN`        | Token du bot. |
| `CLIENT_ID`            | ID de l'application Discord. |
| `APP_ENV`              | `development` pour enregistrer les commandes sur un seul serveur (instantané), sinon commandes globales. |
| `DEVELOPMENT_GUILD_ID` | ID du serveur de test, requis si `APP_ENV=development`. |

## Lancement

```bash
pnpm dev     # développement avec rechargement auto (tsx)
pnpm build   # compilation TypeScript vers dist/
pnpm start   # lance la version compilée
```

## Structure

```
src/
├── index.ts          # point d'entrée, création du client
├── commands/         # commandes slash
├── events/           # événements Discord (clientReady, interactionCreate)
├── handlers/         # chargement des commandes et événements
├── interactions/     # menus de sélection (quiz, personnalité)
├── entities/         # dieux, héros, monstres et questions
├── locales/          # traductions fr / en
├── assets/           # images des entités
└── utils/            # i18n et fonctions utilitaires
```

## Licence

[MIT](LICENSE)