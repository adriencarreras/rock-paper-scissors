let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
  
updateScoreElement();

document.querySelector('body')
  .addEventListener('keydown', (event) => {
    console.log(event.key)
    if (event.key == 'r'){
      playGame('rock')
    } else if (event.key == 'p'){
      playGame('paper')
    } else if (event.key == 's'){
      playGame('scissors')
    }
  })

const confirmMessage = document.querySelector('.js-confirmation-message');

document.querySelector('.js-refresh-score-button')
  .addEventListener('click', () => displayConfirmationMessage())

function displayConfirmationMessage(){
  if (confirmMessage.classList.contains('hide-confirmation-message')){
  confirmMessage.classList.remove('hide-confirmation-message')
} else {confirmMessage.classList.add('hide-confirmation-message')}
}
  
document.querySelector('.js-no-reset-button')
.addEventListener('click', () => displayConfirmationMessage())

let isAutoPlaying = false;
let intervalId;
const autoPlayBtn = document.querySelector('.js-auto-play-button');

autoPlayBtn.addEventListener('click', () => {
  autoPlay();
  })

function autoPlay(){
  if (!isAutoPlaying) {
      const playerMove = pickComputerMove()
          playGame(playerMove)
      intervalId = setInterval(function(){
          const playerMove = pickComputerMove()
          playGame(playerMove);
      },1000)
      isAutoPlaying = true;
      autoPlayButton(1);
  } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      autoPlayButton(2);
  }
}  
  
function autoPlayButton(status){
  if (status == 1) {
      autoPlayBtn.innerHTML = 'Stop Play';
  }
  if (status == 2) {
      autoPlayBtn.innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })
  
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })
  
document.querySelector('.js-reset-button')
  .addEventListener('click', () =>{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    resetDisplay();
  })

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
  <img src="rps.img/${playerMove}-emoji.png" class="move-icon">
  <img src="rps.img/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}
  
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetDisplay(){
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
  confirmMessage.classList.add('hide-confirmation-message');
  if (isAutoPlaying == true){
    autoPlay();
  }

}
  
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}