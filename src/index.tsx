import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./tailwind.output.css";
// import "./index.css";
import Game, { GameState } from "./game";

ReactDOM.render(
  <React.StrictMode>
    <div className="container p-5">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// Simulation mode...
if (false) {
  console.log("Simulating");

  const simGame = () => {
    let game: GameState | null = Game.start();
    let message = Game.getMessage(game);
    while (message != "win" && message != "lose") {
      game = Game.nextState(game);
      if (!game) {
        throw "err1";
      }
      message = Game.getMessage(game);
    }
    if (!game) {
      throw "err2";
    }
    return Game.getMessage(game);
  };

  const MAX_TRIALS = 10000000;
  let i = 0;
  let wins = 0,
    losses = 0;
  while (i < MAX_TRIALS) {
    i += 1;
    const result = simGame();
    if (result === "lose") {
      losses++;
    } else {
      wins++;
    }
    if (i % 100000 === 0) {
      // console.log(`wins = ${wins}, losses = ${losses}`);
      console.log(`win chance = ${wins / i}`);
    }
  }
}
