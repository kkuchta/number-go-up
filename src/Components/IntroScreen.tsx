import React from "react";

type IntroScreenProps = {
  startGame: () => void;
};
const IntroScreen: React.FC<IntroScreenProps> = ({ startGame }) => {
  return (
    <>
      <div className="p-4 text-center">A new adventure awaits you!</div>
      <button onClick={startGame}>Start</button>
    </>
  );
};
export default IntroScreen;
