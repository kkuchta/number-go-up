import React from "react";
import Game, { GameState, Message } from "../game";

const displayMessage = (message: Message, bigBad: boolean) => {
  switch (message) {
    case "got_hit":
      return (
        <span>
          You got hit! Your <b>Health Number</b> decreases by <b>1</b>.
        </span>
      );
    case "lose":
      return (
        <span>
          You got hit! Your <b>Health Number</b> decreases to <b>0</b>. You{" "}
          <b>Lose</b>.
        </span>
      );
    case "ready_to_roll":
      return (
        <span>
          A <b>monster</b> is before you.{" "}
          {bigBad && (
            <>
              It's the <b>Big Bad Boss!</b>
            </>
          )}{" "}
          Roll to fight it!
        </span>
      );
    case "slay":
      return (
        <span>
          You slew the monster! Your <b>Hit Number</b> increases by <b>1</b> and
          the <b>Monster Number</b> increases by <b>1</b>.
        </span>
      );
    case "tie":
      return (
        <span>
          You and the monster <b>tied</b>. Roll again.
        </span>
      );
    case "win":
      return <span>You slew the monster! You win!</span>;
  }
};

const buttonText = (message: Message) => {
  switch (message) {
    case "win":
    case "lose":
      return "New Adventure";
    case "ready_to_roll":
      return "Roll";
    default:
      return "Continue";
  }
};

export type PlayingGameProps = {
  gameState: GameState;
  setGameState: (newState: GameState | null) => void;
};

const PlayingGame: React.FC<PlayingGameProps> = ({
  gameState,
  setGameState,
}) => {
  const message = Game.getMessage(gameState);
  const { health, hit, monster } = gameState;
  return (
    <>
      <div className="grid grid-cols-2 gap 4">
        <div className="you">
          <div className="numberBox">
            <div className="label">Health Number</div>
            <div className="number">{health}</div>
          </div>
          <div className="numberBox">
            <div className="label">Hit Number</div>
            <div className="number">{hit}</div>
          </div>
        </div>
        <div className="monster">
          <div className="numberBox">
            <div className="label">Monster Number</div>
            <div className="number">{monster}</div>
          </div>
        </div>
      </div>
      <div className="flex self-center m-1 h-12">
        {gameState.roll && (
          <>
            You rolled a{" "}
            <span className="font-bold mx-3">{gameState.roll}</span>
          </>
        )}
      </div>
      <div className="text-center h-24">
        {displayMessage(message, monster === 26)} {}
      </div>
      <button onClick={() => setGameState(Game.nextState(gameState))}>
        {buttonText(message)}
      </button>
    </>
  );
};
export default PlayingGame;
