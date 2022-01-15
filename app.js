const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode"));

let selectedLevelButton = levels.find((level) => {
  const classList = Array.from(level.classList);
  return classList.includes("selected");
});

let gameLevel = selectedLevelButton.innerHTML;

let squares = getSquares();

levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove("selected"));
    this.classList.add("selected");

    gameLevel = this.innerHTML;
    setTilesAccordingtoLevel(gameLevel);
    squares = getSquares();
  });
});

function getSquares() {
  const allSquares = Array.from(document.getElementsByClassName("square"));

  if (gameLevel == "Easy") {
    return allSquares.slice(0, 3)
  } else {
    return allSquares
  }
}

function setTilesAccordingtoLevel(currentGameLevel) {
  const allSquares = Array.from(document.getElementsByClassName("square"));

  if (currentGameLevel == "Easy") {
    // set three sqaures on screen
      const firstThreeSquares = allSquares.slice(0, 3)
      const lastThreeSquares = allSquares.slice(3, 6)
      lastThreeSquares.forEach(sq => sq.classList.add("hidden"));
      //this consle.table is placed here for linting purposes as firstThreeSquares was not called after delaration. Thanks 
      console.table({firstThreeSquares})
      // allSquares
  } else if (currentGameLevel == "Hard") {
    // set six squares on screen
    allSquares.forEach(sq => sq.classList.remove("hidden"))
  }
}

// The squre background colors
const startButton = document.getElementById("reset");

startButton.addEventListener("click", function () {
  this.innerHTML = "New Colors";
  // assign each individual square a background color
  for (let i = 0; i < squares.length; i++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const rgbString = "rgb(" + red + "," + green + ", " + blue + ")";

    const square = squares[i];

    //this particular line tripped me!!!
    square.dataset.rgb_value = JSON.stringify([red, green, blue]);
    square.style.backgroundColor = rgbString;
  }

  //assign the Header a random rgb value from one og the square values
  const randomSquareIndex = Math.floor(Math.random() * squares.length);
  const headerColorSquare = squares[randomSquareIndex];
  setHeaderRgbBackgroundColour(headerColorSquare);
});

function setHeaderRgbBackgroundColour(squareElement) {
  const setHeaderElementBackgroundColor = (rgbValues, element) => {
    const [r, g, b] = rgbValues;
    const rgbString = `rgb( ${r}, ${g}, ${b} )`;
    //change the style of the red top boxes
    element.style.backgroundColor = rgbString;
    //change the element to the figure
    element.innerHTML = rgbValues.find((rgbValue) => {
      return rgbValue > 0;
    });
  };
  const rgbString = squareElement.dataset.rgb_value;
  // This line grabs the  rgb value of the element at the top
  colorDisplayElement.dataset.rgb_value = rgbString;
  const [red, green, blue] = JSON.parse(rgbString);

  const redBackground = [red, 0, 0];
  const greenBackground = [0, green, 0];
  const blueBackground = [0, 0, blue];

  setHeaderElementBackgroundColor(redBackground, rElement);
  setHeaderElementBackgroundColor(greenBackground, gElement);
  setHeaderElementBackgroundColor(blueBackground, bElement);
}

// Add event listner to squares so that it either disappears or changes every square's color using the forEach method
squares.forEach((square) => {
  square.addEventListener("click", function () {
    const headerRgbValue = colorDisplayElement.dataset.rgb_value;
    const sqaureRgbValue = this.dataset.rgb_value;

    if (headerRgbValue == sqaureRgbValue) {
      setSquareBackgroundAfterWin(headerRgbValue);
    } else {
      this.classList.add("hidden");
    }
  });
});

function setSquareBackgroundAfterWin(headerRgbString) {
  const [r, g, b] = JSON.parse(headerRgbString);
  const rgbString = `rgb( ${r}, ${g}, ${b} )`;

  squares.forEach((sq) => {
    sq.classList.remove("hidden");
    sq.style.backgroundColor = rgbString;
    sq.dataset.rgb_value = colorDisplayElement.dataset.rgb_value;
  });
}
