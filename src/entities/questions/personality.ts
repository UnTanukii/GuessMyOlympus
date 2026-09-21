import { PersonalityQuestion } from "../../types";

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: "conflict",
    answers: [
      {
        id: "conflict.a",
        changes: {
          authority: 35,
          impulsivity: 25,
          logic: -15
        }
      },
      {
        id: "conflict.b",
        changes: {
          logic: 35,
          empathyProtection: 15,
          impulsivity: -20
        }
      },
      {
        id: "conflict.c",
        changes: {
          mischief: 30,
          creativity: 20,
          authority: -10
        }
      },
      {
        id: "conflict.d",
        changes: {
          independence: 35,
          sociability: -25
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
          logic: 30,
          authority: 15,
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
          impulsivity: 30,
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
          logic: 30,
          independence: 15,
          empathyProtection: 5
        }
      },
      {
        id: "support.c",
        changes: {
          independence: 25,
          sociability: -25
        }
      },
      {
        id: "support.d",
        changes: {
          mischief: 30,
          creativity: 15,
          independence: 15
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
          independence: 20,
          logic: 15
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
          empathyProtection: 35,
          sociability: 10
        }
      },
      {
        id: "social-event.c",
        changes: {
          independence: 30,
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
          creativity: 35,
          independence: 15
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
          logic: 25,
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
          impulsivity: 35,
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
  },
  {
    id: "failure-reaction",
    answers: [
      {
        id: "failure-reaction.a",
        changes: {
          impulsivity: 35,
          authority: 15,
          mischief: 10
        }
      },
      {
        id: "failure-reaction.b",
        changes: {
          logic: 35,
          creativity: 15
        }
      },
      {
        id: "failure-reaction.c",
        changes: {
          mischief: 30,
          independence: 15
        }
      },
      {
        id: "failure-reaction.d",
        changes: {
          empathyProtection: 25,
          sociability: 20
        }
      }
    ]
  },
  {
    id: "unknown-place",
    answers: [
      {
        id: "unknown-place.a",
        changes: {
          independence: 35,
          mischief: 15
        }
      },
      {
        id: "unknown-place.b",
        changes: {
          logic: 30,
          authority: 15
        }
      },
      {
        id: "unknown-place.c",
        changes: {
          sociability: 35,
          empathyProtection: 10
        }
      },
      {
        id: "unknown-place.d",
        changes: {
          creativity: 30,
          impulsivity: 15
        }
      }
    ]
  }
];