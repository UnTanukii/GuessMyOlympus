import { PersonnalityQuestion } from "../types";

export const personnalityQuestions: PersonnalityQuestion[] = [
  {
    id: "conflict",
    answers: [
      {
        id: "conflict.a",
        changes: {
          authority: 30,
          logic: 10,
          impulsivity: 10
        }
      },
      {
        id: "conflict.b",
        changes: {
          logic: 30,
          impulsivity: -20,
          authority: 10
        }
      },
      {
        id: "conflict.c",
        changes: {
          impulsivity: 35,
          logic: -20,
          sociability: -10
        }
      },
      {
        id: "conflict.d",
        changes: {
          mischief: 30,
          sociability: 20,
          creativity: 10
        }
      }
    ]
  },
  {
    id: "ideal_space",
    answers: [
      {
        id: "ideal_space.a",
        changes: {
          independence: 35,
          sociability: -30
        }
      },
      {
        id: "ideal_space.b",
        changes: {
          sociability: 35,
          creativity: 15,
          independence: -20
        }
      },
      {
        id: "ideal_space.c",
        changes: {
          logic: 25,
          authority: 10,
          impulsivity: -15
        }
      },
      {
        id: "ideal_space.d",
        changes: {
          creativity: 35,
          independence: 15
        }
      }
    ]
  },
  {
    id: "ambiguous_task",
    answers: [
      {
        id: "ambiguous_task.a",
        changes: {
          impulsivity: 25,
          mischief: 20,
          logic: -15
        }
      },
      {
        id: "ambiguous_task.b",
        changes: {
          logic: 35,
          authority: 15
        }
      },
      {
        id: "ambiguous_task.c",
        changes: {
          sociability: 25,
          empathyProtection: 25
        }
      },
      {
        id: "ambiguous_task.d",
        changes: {
          independence: 35,
          authority: 15
        }
      }
    ]
  },
  {
    id: "support",
    answers: [
      {
        id: "support.a",
        changes: {
          empathyProtection: 35,
          sociability: 10
        }
      },
      {
        id: "support.b",
        changes: {
          logic: 25,
          independence: 15,
          empathyProtection: 5
        }
      },
      {
        id: "support.c",
        changes: {
          independence: 20,
          sociability: -25
        }
      },
      {
        id: "support.d",
        changes: {
          mischief: 30,
          creativity: 15
        }
      }
    ]
  },
  {
    id: "unexpected_obstacle",
    answers: [
      {
        id: "unexpected_obstacle.a",
        changes: {
          impulsivity: 35,
          authority: 15,
          logic: -20
        }
      },
      {
        id: "unexpected_obstacle.b",
        changes: {
          mischief: 30,
          creativity: 25
        }
      },
      {
        id: "unexpected_obstacle.c",
        changes: {
          logic: 30,
          impulsivity: -20
        }
      },
      {
        id: "unexpected_obstacle.d",
        changes: {
          authority: 25,
          independence: 20
        }
      }
    ]
  },
  {
    id: "social_event",
    answers: [
      {
        id: "social_event.a",
        changes: {
          sociability: 35,
          creativity: 15
        }
      },
      {
        id: "social_event.b",
        changes: {
          empathyProtection: 30,
          sociability: 10
        }
      },
      {
        id: "social_event.c",
        changes: {
          independence: 25,
          sociability: -25
        }
      },
      {
        id: "social_event.d",
        changes: {
          mischief: 30,
          sociability: 15
        }
      }
    ]
  },
  {
    id: "daily_expression",
    answers: [
      {
        id: "daily_expression.a",
        changes: {
          creativity: 35
        }
      },
      {
        id: "daily_expression.b",
        changes: {
          authority: 30,
          independence: 10
        }
      },
      {
        id: "daily_expression.c",
        changes: {
          logic: 20,
          empathyProtection: 20
        }
      },
      {
        id: "daily_expression.d",
        changes: {
          mischief: 35,
          sociability: 15
        }
      }
    ]
  },
  {
    id: "greatest_strength",
    answers: [
      {
        id: "greatest_strength.a",
        changes: {
          empathyProtection: 35
        }
      },
      {
        id: "greatest_strength.b",
        changes: {
          logic: 35,
          impulsivity: -20
        }
      },
      {
        id: "greatest_strength.c",
        changes: {
          impulsivity: 30,
          authority: 10
        }
      },
      {
        id: "greatest_strength.d",
        changes: {
          mischief: 25,
          creativity: 20,
          independence: 10
        }
      }
    ]
  }
];