export const PlayerRole = {
  Player: "player",
  Observer: "observer",
} as const;

export type PlayerRole = (typeof PlayerRole)[keyof typeof PlayerRole];

export const UserType = {
  Human: "human",
  Bot: "bot",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];
