import { Entity } from "../types";

export const heroes: Entity[] = [
  {
    id: "hercules",
    type: "hero",
    personality: {
      authority: 70,
      logic: 30,
      impulsivity: 85,
      sociability: 60,
      independence: 70,
      mischief: 20,
      creativity: 30,
      empathyProtection: 75
    }
  },
  {
    id: "achilles",
    type: "hero",
    personality: {
      authority: 80,
      logic: 40,
      impulsivity: 90,
      sociability: 40,
      independence: 85,
      mischief: 30,
      creativity: 20,
      empathyProtection: 60
    }
  },
  {
    id: "odysseus",
    type: "hero",
    personality: {
      authority: 75,
      logic: 90,
      impulsivity: 20,
      sociability: 70,
      independence: 80,
      mischief: 90,
      creativity: 85,
      empathyProtection: 50
    }
  },
  {
    id: "perseus",
    type: "hero",
    personality: {
      authority: 60,
      logic: 75,
      impulsivity: 40,
      sociability: 50,
      independence: 75,
      mischief: 50,
      creativity: 70,
      empathyProtection: 85
    }
  }
];