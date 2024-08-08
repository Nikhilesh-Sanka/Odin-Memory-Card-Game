import { Fragment } from "react";

export async function fetchPokemonImages(pokemons) {
  let finalArray = [];
  for (let i = 0; i < pokemons.length; i++) {
    let fetchedData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`
    );
    let data = await fetchedData.json();
    finalArray.push(data.sprites.front_default);
  }
  return finalArray;
}

export function Cards({ images, level, gameDetails, setGameDetails }) {
  function getSlicedImages(level) {
    return images.slice(0, getNumberFromLevel(level));
  }
  return (
    <div className="card-section">
      {shuffleImages(getSlicedImages(level)).map((image) => {
        return (
          <Fragment key={image}>
            <Card
              imageUrl={image}
              gameDetails={gameDetails}
              setGameDetails={setGameDetails}
              level={level}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

function Card({ imageUrl, gameDetails, setGameDetails, level }) {
  function handleClick(image) {
    if (
      gameDetails.clickedImages.every((clickedImage) => clickedImage !== image)
    ) {
      if (getNumberFromLevel(level) === gameDetails.clickedImages.length + 1) {
        let newGameDetails = {
          currentScore: 0,
          bestScore: gameDetails.clickedImages.length + 1,
          clickedImages: [],
          roundStatus: [
            "over",
            "You have got the maximum possible points in the current level !",
          ],
        };
        setGameDetails(newGameDetails);
        return;
      } else {
        document.querySelectorAll(".card").forEach((card) => {
          card.classList.add("rotate");
        });
        document.querySelector(".card").addEventListener("animationend", () => {
          document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("rotate");
          });
        });
        let newGameDetails = {
          ...gameDetails,
          clickedImages: [...gameDetails.clickedImages, image],
          currentScore: gameDetails.currentScore + 1,
          roundStatus: ["notOver", ""],
        };
        setGameDetails(newGameDetails);

        return;
      }
    } else {
      let newBestScore =
        gameDetails.currentScore > gameDetails.bestScore
          ? gameDetails.currentScore
          : gameDetails.bestScore;
      let newGameDetails = {
        currentScore: 0,
        bestScore: newBestScore,
        clickedImages: [],
        roundStatus: ["over", "Oops! you have lost the game"],
      };
      setGameDetails(newGameDetails);
      return;
    }
  }
  return (
    <div
      className={`card`}
      onClick={() => {
        handleClick(imageUrl);
      }}
    >
      <div></div>
      <img src={imageUrl} alt="poke-card" />
    </div>
  );
}

function shuffleImages(images) {
  let count = 0;
  while (count < images.length) {
    let num = Math.floor(Math.random() * images.length);
    if (num === count) {
      continue;
    }
    let image1 = images[count];
    images[count] = images[num];
    images[num] = image1;
    count++;
  }
  return images;
}

function getNumberFromLevel(level) {
  return level === "easy" ? 4 : level === "medium" ? 8 : 12;
}
