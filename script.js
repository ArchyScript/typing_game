// Creating reuseable functions
  const displayContent = (eventId, displayValue) => {
    document.getElementById(eventId).style.display = displayValue
  }
  const displayInnerHTML = (eventId, value) => {
    document.getElementById(eventId).innerHTML = value
  }
  const opacity = (eventId, opacityValue) => {
    document.querySelector(eventId).style.opacity = opacityValue
  }
  const changeColor = (eventId, colorValue) => {
    document.getElementById(eventId).style.color = colorValue
  }

  // Add functions to the home button and user-guide buttons
  // home button
  document.getElementById('home').onclick = () => {
    let check = confirm("You're about to end game and goto the game home page")
    check = check == true ? location.reload() : false
  }
  // about-game button
  document.getElementById('about-game').onclick = () => {
    displayContent('about-gameStruction', 'block')
    displayContent('user-guide', 'none')
    opacity('.container', '.6')
  } 
  // help-me button
  document.getElementById('help-me').onclick = () => {
    displayContent('help-gameStruction', 'block')
    displayContent('user-guide', 'none')
    opacity('.container', '.6')
  } 
  // exit button
  /* document.getElementById('exit-game').onclick = () => {
    let confirmExit = confirm("You're about to EXIT this game and CLOSE CURRENT TAB, Click 'OK' to confirm your action")
    confirmExit = confirmExit ? window.close() : false
  } */

  // Add function to the cancel button
  document.querySelectorAll('.cancel').forEach(cancelMe => {
    cancelMe.addEventListener('click', () => {
      displayContent('user-guide', 'flex')
      displayContent('help-gameStruction','none')
      displayContent('about-gameStruction','none')
      opacity('.container', '1')
    })
  })

  // create reuseable variables
  var time
  var score = 0
  var gameIsLive
  var displayTime
  // create currentLevel object and pass in the time
  const currentLevel = {
      easy: 10,
      medium: 7,
      hard: 4,
      professional: 2,
      legend: 1
    }

  // Start Game Button
  const startGame = document.getElementById('start-game')
  startGame.addEventListener('click', () => {

    // check if the user did not select any level and display error message
    var selectLevel = document.getElementById('select-level').selectedIndex 
    var checkOption = document.getElementById('select-level').options

    if (checkOption[selectLevel].id === '') {
      displayContent('pre-message', 'block')
      return 
    } 

    // display the game environs and remove some content
    displayContent('section', 'block')
    displayContent('home', 'block')
    displayContent('level-status', 'block')
    displayInnerHTML('game-title', '<h5>Build your Typing Skills <a href="#">@Yung<span class="script">Script</span></a> Typing Game 🤓🤓🤓</h5>')
    displayContent('header', 'none')
    displayContent('start-game', 'none')
    displayContent('user-guide', 'none')

    startPlayingGame()
  }) 


  function checkCurrentLevel(event) {
    displayContent('current-level-time-div', 'block')
    
    if (event === 'easy') {
      time = currentLevel.easy 
      displayInnerHTML('current-level', 'EASY')
      displayInnerHTML('seconds', time)  
    } 
    if (event === 'medium') {
      time = currentLevel.medium 
      displayInnerHTML('current-level', 'MEDIUM')
      displayInnerHTML('seconds', time)  
    } 
    if (event === 'hard') {
      time = currentLevel.hard 
      displayInnerHTML('current-level', 'HARD')
      displayInnerHTML('seconds', time)  
    } 
    if (event === 'prof') {
      time = currentLevel.professional 
      displayInnerHTML('current-level', 'PROFESSIONAL')
      displayInnerHTML('seconds', time)   
    }
    if (event === 'legend') {
      time = currentLevel.legend 
      displayInnerHTML('current-level', 'LEGEND')
      displayInnerHTML('seconds', time)  
    }
  }

  // calls function onclick on the START GAME button
  function startPlayingGame() {
    var selectLevel = document.getElementById('select-level').selectedIndex 
    var checkOption = document.getElementById('select-level').options

    if (checkOption[selectLevel].id === 'easy') {
      checkCurrentLevel('easy')
      displayTime = currentLevel.easy 
    } 
    if (checkOption[selectLevel].id === 'medium') {
      checkCurrentLevel('medium')
      displayTime = currentLevel.medium
    }
    if (checkOption[selectLevel].id === 'hard') {
      checkCurrentLevel('hard')
      displayTime = currentLevel.hard
    }
    if (checkOption[selectLevel].id === 'prof') {
      checkCurrentLevel('prof')
      displayTime = currentLevel.professional
    }
    if (checkOption[selectLevel].id === 'legend') {
      checkCurrentLevel('legend')
      displayTime = currentLevel.legend
    }

  // call the gameInitializer function
    gameInitializer()
}


  const currentInput = document.getElementById('input-word')
  const currentWord = document.getElementById('current-word')
  const countDownTime = document.getElementById('time')

function gameInitializer() {
  // call the displayWords function
  displayWords(WORDS)

  // add one(1) to the time value to start the countdown from the currentLevel time
  time = displayTime + 1

  // call the checkMatch function oninput
  currentInput.addEventListener('input', startMatch)

  // call and set time interval 
  setInterval(countDown, 1000)

  // check game status
  setInterval(gameStatus, 50)
}

// Start match
function startMatch() {
  if (matchWords()) {
    gameIsLive = true;
    time = displayTime 
    displayInnerHTML('time', time)
    displayWords(WORDS);
    currentInput.value = '';
    score++;
  } 
  // If score is -1, display 0
  if (score == -1) {
    displayInnerHTML('score', 0)
  } else {
    displayInnerHTML('score', score)
  } 
} 

function matchWords() {
if (currentInput.value === currentWord.innerHTML) {
  displayInnerHTML('message', 'Correct!!! ✔️✔️✔️ ')
  changeColor('message', 'green')
  return true;
} else {
  displayInnerHTML('message', '')
  return false;
}
}

// Countdown timer
function countDown() {
// Make sure time is not run out
if (time > 0) {
// Decrement
time--;
} else if (time === 0) {
// Game is over
gameIsLive = false;
}
// Show time
displayInnerHTML('time', time)  
} 

// gameStatus
function gameStatus () {
  if (!gameIsLive && time === 0) {
    displayInnerHTML('message', 'Game Over!!!, Type the current word to start again')
    changeColor('message', 'red')
    score = -1; 
  } 
}

// create a function to generate random word
function displayWords (WORDS) {
  // Generate random number between the first and last index of the WORDS array
  var randomWords = Math.floor(Math.random() * WORDS.length)
  // display generated random words and insert it in  the currentWord innerHTML
  displayInnerHTML('current-word', WORDS[randomWords])
}


  const WORDS = [ 
    'concubine', 'citonhub', 'variable', 'programmer', 'script', 'event', 'procrastinate', 'package', 'library', 'float', 'hacking','javascript','python',
    'submit', 'remove', 'overflow', 'freelancing', 'web hosting', 'domain', 'seo', 'hacker', 'coding', 'function', 'array', 'php', 'user interface',
    'keywords', 'conditions', 'project', 'independence', 'string', 'filter', 'remove', 'display', 'flexbox', 'value', 'identifier', 'elements', 'objects', 'integer',
    'end sars', 'reform police', 'soro soke', 'google', 'amazon', 'tesla', 'spaceX', 'facebook', 'twitter', 'tracker', 'security', 'word press', 'typescript', 
    'links', 'styles', 'mark up', 'flutterwave', 'institutions', 'instructor', 'opera', 'solarcity', 'local', 'global', 'return', 'onclick', 'ondrag', 'prevent', 'gates',
    'cruel', 'life', 'channels', 'team', 'message', 'block', 'inline', 'drop', 'cancel', 'location', 'reload', 'refresh', 'console', 'warning', 'catch', 'then', 'background',
    'reduce', 'read', 'sharp', 'likee', 'story', 'react', 'angular', 'sunshine', 'moonlight', 'redeem', 'dynamic', 'legend', 'professional', 'daylight', 'ecosystem',
    'technology', 'advance', 'delete', 'recall', 'manage', 'extract', 'wild', 'beast', 'super hero', 'medium', 'hard', 'though', 'tackle', 'strategy', 'newbie', 'deploy', 
    'reinforce', 'participate', 'adjacent', 'ogle', 'detain', 'reason', 'time', 'progress', 
    
    'container', 'input', 'button', 'types', 'grid', 'flex', 'translate',

    
     'dorsey', 'raymond', 'olutola', 'daniel',
    '...' 
  ]
 // alert(WORDS.length)