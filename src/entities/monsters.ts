import { Entity } from "../types";

export const monsters: Entity[] = [
  {
    id: "medusa",
    type: "monster",
    personnality: {
      authority: 75,
      logic: 50,
      impulsivity: 60,
      sociability: 10,
      independence: 95,
      mischief: 30,
      creativity: 20,
      empathyProtection: 30
    }
  },
  {
    id: "minotaur",
    type: "monster",
    personnality: {
      authority: 60,
      logic: 10,
      impulsivity: 100,
      sociability: 10,
      independence: 85,
      mischief: 10,
      creativity: 10,
      empathyProtection: 10
    }
  },
  {
    id: "cerberus",
    type: "monster",
    personnality: {
      authority: 70,
      logic: 40,
      impulsivity: 50,
      sociability: 30,
      independence: 30,
      mischief: 20,
      creativity: 10,
      empathyProtection: 95
    }
  },
  {
    id: "sphinx",
    type: "monster",
    personnality: {
      authority: 80,
      logic: 95,
      impulsivity: 20,
      sociability: 30,
      independence: 80,
      mischief: 85,
      creativity: 70,
      empathyProtection: 20
    }
  },
  {
    id: "sirens",
    type: "monster",
    personnality: {
      authority: 50,
      logic: 40,
      impulsivity: 60,
      sociability: 70,
      independence: 60,
      mischief: 95,
      creativity: 85,
      empathyProtection: 20
    }
  }
];