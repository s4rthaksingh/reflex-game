import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gameRunning, setGameRunning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState([0, 0]);
  const [playerNames, setPlayerNames] = useState({
    q: "Player 1",
    l: "Player 2",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameRunning) {
        if (e.key === "q") {
          setWinner(playerNames.q);
          setScore((prev) => [prev[0] + 1, prev[1]]);
          setGameRunning(false);
        }
        if (e.key === "l") {
          setWinner(playerNames.l);
          setScore((prev) => [prev[0], prev[1] + 1]);
          setGameRunning(false);
        }
        console.log(score);
      }
      if (e.key === "Enter" && !gameRunning) {
        setWinner(null);
        document.getElementById("gameOverText").textContent =
          "Game will start randomly";
        setTimeout(() => {
          setGameRunning(true);
        }, Math.floor(Math.random() * 9001) + 1000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameRunning]);

  if (gameRunning)
    return (
      <>
        <div
          className="flex h-screen w-screen text-[#38302E]"
          spellCheck="false"
        >
          <div className="w-1/2 bg-[#A8E6C8] font-thin">
            <h1
              className="mt-4 border-0 outline-0"
              contentEditable="true"
              onBlur={(e) =>
                setPlayerNames((prev) => ({
                  q: e.target.textContent,
                  l: prev.l,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
            >
              {playerNames.q}
            </h1>
            {winner === "Player 1" && <h1>Winner</h1>}
            <div className="flex h-full items-center justify-center">
              <h1 className="mb-50 ">Press Q</h1>
            </div>
          </div>
          <div className="w-1/2 bg-[#A8E6D4] font-thin">
            <h1
              className="mt-4 border-0 outline-0"
              contentEditable="true"
              onBlur={(e) =>
                setPlayerNames((prev) => ({
                  q: prev.q,
                  l: e.target.textContent,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
            >
              {playerNames.l}
            </h1>
            {winner === "Player 2" && <h1>Winner</h1>}
            <div className="flex h-full items-center justify-center">
              <h1 className="mb-50 ">Press L</h1>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center font-thin text-gray-950 bg-[#B8D5BA]">
      {winner && (
        <h1 className="mb-15" id="winnerText">
          {winner} wins!
        </h1>
      )}
      <h1>
        {playerNames.q} : {score[0]}
      </h1>
      <h1>
        {playerNames.l} : {score[1]}
      </h1>
      <h1 className="text-9xl mb-15 mt-15" id="gameOverText">
        Press enter to start
      </h1>
    </div>
  );
}

export default App;
