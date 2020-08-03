const rollDie = () => Math.floor(Math.random() * 10) + 1;

export type GameState = {
  health: number;
  monster: number;
  hit: number;
  roll: number | null;
};
export type Message =
  | "ready_to_roll"
  | "slay"
  | "got_hit"
  | "tie"
  | "win"
  | "lose";
const Game = {
  start: (): GameState => {
    return {
      health: 5,
      hit: 0,
      monster: 4,
      roll: null,
    };
  },
  nextState: (state: GameState): GameState | null => {
    const { hit, monster, health } = state;
    let nextState = { ...state, roll: null };
    // We're displaying a roll now, so next we either win/lose/continue
    switch (Game.getMessage(state)) {
      case "ready_to_roll":
        return { ...nextState, roll: rollDie() };
      case "slay":
        const nextMonster = hit === 19 ? 26 : monster + 1;
        return { ...nextState, hit: hit + 1, monster: nextMonster };
      case "got_hit":
        return { ...nextState, health: health - 1 };
      case "tie":
        return nextState;
      case "win":
        return null;
      case "lose":
        return null;
      default:
        throw Error("unhandled state!!");
    }
  },
  getMessage: (state: GameState): Message => {
    const { roll, hit, monster, health } = state;
    if (!roll) {
      return "ready_to_roll";
    }

    const totalHit = roll + hit;
    if (totalHit > monster) {
      return monster === 26 ? "win" : "slay";
    } else if (totalHit < monster) {
      return health === 1 ? "lose" : "got_hit";
    } else {
      return "tie";
    }
  },
};
export default Game;
