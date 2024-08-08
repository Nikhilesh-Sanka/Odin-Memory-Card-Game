import { useState, useEffect } from "react";
import { GameSection } from "./components/game.jsx";
import { WelcomeSection } from "./components/welcome.jsx";
import { fetchPokemonImages } from "./components/cards.jsx";

export function App() {
  let [gameStatus, setGameStatus] = useState("notStarted");
  let [images, setImages] = useState([]);
  useEffect(() => {
    let pokemons = [
      "bulbasaur",
      "squirtle",
      "charizard",
      "caterpie",
      "kakuna",
      "pidgey",
      "raticate",
      "arbok",
      "pikachu",
      "sandshrew",
      "nidoqueen",
      "clefairy",
    ];
    fetchPokemonImages(pokemons).then((result) => {
      setImages(result);
    });
  }, []);
  return (
    <>
      <Main
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        images={images}
      />
    </>
  );
}
function Main(props) {
  return (
    <div className="main">
      {props.gameStatus === "isStarted" ? (
        <GameSection
          images={props.images}
          setGameStatus={props.setGameStatus}
        />
      ) : (
        <WelcomeSection {...props} />
      )}
    </div>
  );
}
