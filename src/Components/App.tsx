import React, { useState } from "react";
import Game, { GameState, Message } from "../game";
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
    </div>
  );
};

export default App;
