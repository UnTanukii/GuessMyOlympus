import { QuizzQuestionDifficulty } from "./types.js";

export const quizzQuestionDifficulties: QuizzQuestionDifficulty[] = ["easy", "medium", "hard", "expert", "all"];
export const quizzQuestionDifficultyEmojis: Record<QuizzQuestionDifficulty, string> = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
  expert: "🟣",
  all: "⚪"
};
export const quizzQuestionCount = 6;