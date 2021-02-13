import {Game} from "./js-components/game"
import timeHistoryContainer from './js-components/timeHistoryContainer';
import Timer from './js-components/timer';
import logo from './js-components/starting_page/logo'
import menuContainer from './js-components/starting_page/menuContainer'

// load stat window
document.body.appendChild(logo());
document.body.appendChild(menuContainer());


// start the game after click button
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click',()=>{
  // hide start box after start the game
  let logoElement = document.querySelector('.logo');
  let menuContainer = document.querySelector('.menuContainer');
  let bodyContainer = document.getElementsByTagName('body');

  bodyContainer[0].classList.remove('body-start-page');
  logoElement.classList.add('display-none');
  menuContainer.classList.add('display-none');

  const game = new Game();
  document.body.appendChild(timeHistoryContainer());
  var TimerTry = new Timer(1, 'timer-white');
  var TimerTry1 = new Timer(1, 'timer-black');
  // TEST:
  if (true) {
    TimerTry.start();
  }
  let el = document.getElementById('timer-black');
  if (true) {
    TimerTry1.start();
  }
  document.querySelectorAll('.board-container div').forEach(element => {
      element.addEventListener('click', selectPiece)
  });
  function selectPiece(e) {
    if (e.target.parentElement.classList.contains('pieceInside'))
      game.startMove(e.target.parentElement);
  }
  //COFANIE RUCHÓW
  document.querySelector('.undo-button').addEventListener('click', () => {
    game.reverseMove();
  });
  // document.querySelector('.en')?.addEventListener('click', () => {
  //   document.documentElement.lang = 'en';
  // });
  // document.querySelector('.pl').addEventListener('click', () => {
  //   document.documentElement.lang = 'pl';
  // });
},false)


