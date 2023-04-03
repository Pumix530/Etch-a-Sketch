let slider_value = document.querySelector('.slider_value');
let bgColor = document.querySelector(".background_picker");
let squares = document.querySelectorAll(".square");
let slider = document.querySelector(".slider");
let penColor = document.querySelector(".pen_picker");
let erase = document.querySelector('.toggle_eraser');
let rainbow = document.querySelector(".toggle_Rainbow");
let clear = document.querySelector('.clear')
let grid = document.querySelector(".grid_wrapper")
let gridLines = document.querySelector(".toggle_grid_lines")

const DEFAULT_COLOR = "#000000"
const DEFAULT_MODE = 'color'
const DEFAULT_BACKGROUND_COLOR = "#ffffff"
//Buttons and Pen

let currentMode = DEFAULT_MODE;
penColor.value = DEFAULT_COLOR;
bgColor.value = DEFAULT_BACKGROUND_COLOR;

function setCurrentMode(newMode){
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentColor(newColor) {
    penColor.value = newColor
  }

penColor.oninput = (e) => setCurrentColor(e.target.value)
penColor.onclick = () => setCurrentMode('color')
erase.onclick = () => setCurrentMode('eraser')
rainbow.onclick = () => setCurrentMode('rainbow')
clear.onclick = () => reload()
gridLines.onclick = () => activeBorder()


// Checks if mouse is clicked
let mouseDown = false
grid.addEventListener('mousedown', () => {
  mouseDown = true;
});
grid.addEventListener('mouseup', () => {
  mouseDown = false;
});

// Grid size slider text change
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
      timerId = null;
    }, delay);
  };
}



const DEBOUNCE_DELAY = 300;

const debouncedChangeSize = debounce(changeSize, DEBOUNCE_DELAY);

slider.addEventListener('input', function() {
  slider_value.textContent = slider.value + " x " + slider.value ;
  debouncedChangeSize();
  console.log(slider.value);
});

// Grid
function gridSize(size){
    const grid = document.querySelector(".grid");
    let squares = grid.querySelectorAll('div')

    //This removes div and creates div for grid
    squares.forEach((div) => div.remove())
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    let amount = size * size
    for (let i = 0; i < amount; i++){
        let square = document.createElement("div");
        square.addEventListener('mouseover', colorSquare)
        square.addEventListener('mousedown', colorSquare);
        square.classList.add("square");
        // Background color change
        bgColor.addEventListener('input', function(){
            for (let i = -1; i < squares.length; i++){
            square.style.backgroundColor = bgColor.value;
}
});
        grid.insertAdjacentElement("beforeend", square);
    }
}



function changeSize(){
    gridSize(slider.value);
}

gridSize(16)
// Function that colors the grid 
function colorSquare(e){
    if (e.type === 'mouseover' && !mouseDown){
        return
    }
    else if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  }
  else if (currentMode === 'color'){
      this.style.backgroundColor = penColor.value
  }
  else if (currentMode === 'eraser') {
      this.style.backgroundColor = bgColor.value
}   
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbow.classList.remove('active')
    } else if (currentMode === 'color') {
      penColor.classList.remove('active')
    } else if (currentMode === 'eraser') {
      erase.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbow.classList.add('active');
      erase.style.color = "rgb(249, 148, 23)";
      erase.style.backgroundColor = "rgb(24, 24, 24)";
      rainbow.style.color = "rgb(24, 24, 24)";
      rainbow.style.backgroundColor = "rgb(249, 148, 23)";
    } else if (newMode === 'color') {
      penColor.classList.add('active')
      rainbow.style.color = "rgb(249, 148, 23)";
      rainbow.style.backgroundColor = "rgb(24, 24, 24)";
      erase.style.color = "rgb(249, 148, 23)";
      erase.style.backgroundColor = "rgb(24, 24, 24)";
    } else if (newMode === 'eraser') {
      rainbow.style.color = "rgb(249, 148, 23)";
      rainbow.style.backgroundColor = "rgb(24, 24, 24)";
      erase.style.color = "rgb(24, 24, 24)";
      erase.style.backgroundColor = "rgb(249, 148, 23)";
      erase.classList.add('active')
    }
  }

  function reload(){
    gridSize(16);
    slider_value.textContent = "16 x 16" ;
    erase.style.color = "rgb(249, 148, 23)";
    erase.style.backgroundColor = "rgb(24, 24, 24)";
    rainbow.style.color = "rgb(249, 148, 23)";
    rainbow.style.backgroundColor = "rgb(24, 24, 24)";
  }

  function activeBorder(){
    let squares = document.querySelectorAll(".square");
    if (gridLines.classList.contains("active")){
      gridLines.style.color = "rgb(249, 148, 23)";
      gridLines.style.backgroundColor = "rgb(24, 24, 24)";
      squares.forEach(square => square.style.border = "none");
      gridLines.classList.remove("active")
    }
    else{
      gridLines.style.color = "rgb(24, 24, 24)";
      gridLines.style.backgroundColor = "rgb(249, 148, 23)";
      squares.forEach(square => square.style.border = "1px solid gray");
      gridLines.classList.add("active");
    }
  }
