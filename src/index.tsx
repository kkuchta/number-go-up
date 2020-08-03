import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import "./tailwind.output.css";
// import "./index.css";
import Game, { GameState } from "./game";
import queryString from "query-string";

ReactDOM.render(
  <React.StrictMode>
    <div className="container p-5">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

const params = queryString.parse(window.location.search);

// Secret simulation mode with ?sim=1000
if (params.sim) {
  const max_trials = parseInt(params.sim as string, 10);
  console.log(`Simulating ${max_trials} games...`);

  const simGame = () => {
    let game: GameState | null = Game.start();
    let message = Game.getMessage(game);
    while (message !== "win" && message !== "lose") {
      game = Game.nextState(game);
      if (!game) {
        throw Error("err1");
      }
      message = Game.getMessage(game);
    }
    return Game.getMessage(game);
  };

  let i = 0;
  let wins = 0;
  while (i < max_trials) {
    i += 1;
    const result = simGame();
    if (result === "win") {
      wins++;
    }
    if (i % 100000 === 0 || i === max_trials - 1) {
      // console.log(`wins = ${wins}, losses = ${losses}`);
      console.log(`Percent of games that were wins: ${wins / i}`);
    }
  }
}
