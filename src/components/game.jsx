import { useState } from "react";
import { Cards } from "./cards.jsx";

export function GameSection(props) {
  let [level, setLevel] = useState("");
  return (
    <div className="game">
      {level === "" ? (
        <LevelSelection setLevel={setLevel} />
      ) : (
        <GameMain
          level={level}
          images={props.images}
          setGameStatus={props.setGameStatus}
        />
      )}
    </div>
  );
}

function ScoreBoard(props) {
  return (
    <div className="score-board">
      <p>Score: {props.currentScore}</p>
      <p>Best Score: {props.bestScore}</p>
    </div>
  );
}

function LevelSelection(props) {
  function selectLevel() {
    props.setLevel(document.querySelector("#level").value);
  }
  return (
    <div className="level-selection">
      <label htmlFor="level">Select Level</label>
      <select id="level" defaultValue="easy">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={selectLevel}>Submit</button>
    </div>
  );
}

function GameMain(props) {
  let [gameDetails, setGameDetails] = useState({
    currentScore: 0,
    bestScore: 0,
    clickedImages: [],
    roundStatus: ["notOver", ""],
  });
  // let [roundStatus, setRoundStatus] = useState(["notOver", ""]);
  return (
    <div className="game-main">
      <ScoreBoard
        currentScore={gameDetails.currentScore}
        bestScore={gameDetails.bestScore}
      />
      {gameDetails.roundStatus[0] === "notOver" ? (
        <Cards
          images={props.images}
          level={props.level}
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
        />
      ) : (
        <NewRoundScreen
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
          setGameStatus={props.setGameStatus}
        />
      )}
    </div>
  );
}

function NewRoundScreen({ gameDetails, setGameDetails, setGameStatus }) {
  function startNewRound() {
    let newGameDetails = {
      ...gameDetails,
      currentScore: 0,
      clickedImages: [],
      roundStatus: ["notOver", ""],
    };
    setGameDetails(newGameDetails);
  }
  function restartGame() {
    setGameStatus("notStarted");
  }
  return (
    <div className="new-round-section">
      <p>{gameDetails.roundStatus[1]}</p>
      <button onClick={startNewRound}>Play Another Round</button>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}
