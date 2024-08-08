export function WelcomeSection(props) {
  function startGame() {
    props.setGameStatus("isStarted");
  }
  return (
    <div className="welcome">
      <p>
        Hello , Welcome to the game , after clicking the start button you will
        be taken to a page to select the difficulty level of the game , and then
        you will be taken to the game , where a bunch of cards will be displayed
        and on each turn you have to click on a card and then the card{`'`}s
        will be shuffled , after that you have to again choose a card, if the
        card you choose is not any of the cards that you previously selected
        then it continues , otherwise its <span>Game Over</span>
      </p>
      <button id="startGame" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}
