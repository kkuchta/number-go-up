import React, { useState } from "react";
import Game, { GameState } from "../game";
import PlayingGame from "./PlayingGame";
import IntroScreen from "./IntroScreen";

const App = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  return (
    <div className="content-center flex flex-col">
      {gameState ? (
        <PlayingGame
          gameState={gameState}
          setGameState={setGameState}
        ></PlayingGame>
      ) : (
        <IntroScreen startGame={() => setGameState(Game.start)} />
      )}
      <div className="text-center py-5 opacity-75 text-sm">
        <a href="https://twitter.com/evoroxv/status/1267323832945315840">
          @evoroxv
        </a>{" "}
        came up with this game.{" "}
        <a href="https://twitter.com/kkuchta">@kkuchta</a> just{" "}
        <a href="https://github.com/kkuchta/number-go-up">coded</a> it.
      </div>
    </div>
  );
};

export default App;
