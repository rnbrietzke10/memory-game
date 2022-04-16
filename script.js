const gameContainer = document.getElementById('game');
const playerScore = document.getElementById('score');
let colorMatch = [];
let count = 0;
let score = 0;
const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log('you just clicked', event.target);
  // console.log(event.target.className);
  // Sets card color to classname color

  if (count <= 2 && !event.target.classList.contains('.remove-click')) {
    event.target.style.backgroundColor = event.target.className;
    colorMatch.push(event.target.className);

    if (colorMatch.length === 2 && colorMatch[0] === colorMatch[1]) {
      document.querySelectorAll(`.${colorMatch[0]}`).forEach((el) => {
        el.removeEventListener('click', handleCardClick);
      });

      disableClicks();
      colorMatch = [];
      count = 0;
      score++;
    } else if (colorMatch.length === 2 && colorMatch[0] !== colorMatch[1]) {
      score++;
      // console.log(
      //   `inside else if: ${colorMatch.length}  ${colorMatch[0]} ${colorMatch[1]}`
      // );
      disableClicks();
      setTimeout(() => {
        document.querySelectorAll(`.${colorMatch[0]}`).forEach((el) => {
          el.style.backgroundColor = '#fff';
        });

        document.querySelectorAll(`.${colorMatch[1]}`).forEach((el) => {
          el.style.backgroundColor = '#fff';
        });

        colorMatch = [];
        count = 0;
      }, 1000);
    }
    count++;
  }

  playerScore.innerText = score;
}

// when the DOM loads
createDivsForColors(shuffledColors);

function disableClicks() {
  document.querySelectorAll('div').forEach((el) => {
    el.classList.add('.disable');
  });
  setTimeout(() => {
    document.querySelectorAll('div').forEach((el) => {
      el.classList.remove('.disable');
    });
  }, 1000);
}
