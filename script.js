'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores;
let currScore;
let activePlayer;
let playing;

const init = function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);

  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;
};
init();

const cangePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the dice function

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random  dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for roll 1 :if true,switch to next player
    if (dice != 1) {
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switch user

      cangePlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add curr score to active player
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.CHeck if players score is >=100
    if (scores[activePlayer] >= 100) {
      //Finsh game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      cangePlayer();
    }
  }

  //Switch to next player
});

btnNew.addEventListener('click', init);
