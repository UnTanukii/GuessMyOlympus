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
    id: "ideal-space",
    answers: [
      {
        id: "ideal-space.a",
        changes: {
          independence: 35,
          sociability: -30
        }
      },
      {
        id: "ideal-space.b",
        changes: {
          sociability: 35,
          creativity: 15,
          independence: -20
        }
      },
      {
        id: "ideal-space.c",
        changes: {
          logic: 25,
          authority: 10,
          impulsivity: -15
        }
      },
      {
        id: "ideal-space.d",
        changes: {
          creativity: 35,
          independence: 15
        }
      }
    ]
  },
  {
    id: "ambiguous-task",
    answers: [
      {
        id: "ambiguous-task.a",
        changes: {
          impulsivity: 25,
          mischief: 20,
          logic: -15
        }
      },
      {
        id: "ambiguous-task.b",
        changes: {
          logic: 35,
          authority: 15
        }
      },
      {
        id: "ambiguous-task.c",
        changes: {
          sociability: 25,
          empathyProtection: 25
        }
      },
      {
        id: "ambiguous-task.d",
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
    id: "unexpected-obstacle",
    answers: [
      {
        id: "unexpected-obstacle.a",
        changes: {
          impulsivity: 35,
          authority: 15,
          logic: -20
        }
      },
      {
        id: "unexpected-obstacle.b",
        changes: {
          mischief: 30,
          creativity: 25
        }
      },
      {
        id: "unexpected-obstacle.c",
        changes: {
          logic: 30,
          impulsivity: -20
        }
      },
      {
        id: "unexpected-obstacle.d",
        changes: {
          authority: 25,
          independence: 20
        }
      }
    ]
  },
  {
    id: "social-event",
    answers: [
      {
        id: "social-event.a",
        changes: {
          sociability: 35,
          creativity: 15
        }
      },
      {
        id: "social-event.b",
        changes: {
          empathyProtection: 30,
          sociability: 10
        }
      },
      {
        id: "social-event.c",
        changes: {
          independence: 25,
          sociability: -25
        }
      },
      {
        id: "social-event.d",
        changes: {
          mischief: 30,
          sociability: 15
        }
      }
    ]
  },
  {
    id: "daily-expression",
    answers: [
      {
        id: "daily-expression.a",
        changes: {
          creativity: 35
        }
      },
      {
        id: "daily-expression.b",
        changes: {
          authority: 30,
          independence: 10
        }
      },
      {
        id: "daily-expression.c",
        changes: {
          logic: 20,
          empathyProtection: 20
        }
      },
      {
        id: "daily-expression.d",
        changes: {
          mischief: 35,
          sociability: 15
        }
      }
    ]
  },
  {
    id: "greatest-strength",
    answers: [
      {
        id: "greatest-strength.a",
        changes: {
          empathyProtection: 35
        }
      },
      {
        id: "greatest-strength.b",
        changes: {
          logic: 35,
          impulsivity: -20
        }
      },
      {
        id: "greatest-strength.c",
        changes: {
          impulsivity: 30,
          authority: 10
        }
      },
      {
        id: "greatest-strength.d",
        changes: {
          mischief: 25,
          creativity: 20,
          independence: 10
        }
      }
    ]
  }
];