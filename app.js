// Change of slider text 
const slider = document.querySelector(".slider");
const slider_value = document.querySelector('.slider_value');
const slider2_value = document.querySelector('.slider_value2');
let bgColor = document.querySelector(".background_picker");
let squares = document.querySelectorAll(".square");
let penColor = document.querySelector(".pen_picker");

// Color on start

penColor.value = "#000000";
bgColor.value = "#ffffff";


// Grid size slider text change
slider.addEventListener('input', function(){
    slider_value.textContent = slider.value;
    slider2_value.textContent = slider.value;
});

//Change the rows and columns of grid

function girdSize(size){
    const grid = document.querySelector(".grid");
    let squares = grid.querySelectorAll('div')

    //This removes div and creates div for grid
    squares.forEach((div) => div.remove())
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    let amount = size * size

    for (let i = 0; i < amount; i++){
        let square = document.createElement("div");
        // Pen Event Listener
        square.addEventListener('mousedown', colorSquare);
        square.addEventListener('mouseover', colorSquare);
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

girdSize(16);

function changeSize(input){
    girdSize(input);
}


let currentMode = 'color'


// Mouse over
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function colorSquare(e){
    if (e.type === 'mouseover' && !mouseDown) {
        return
    };
    if (curentMode === "rainbow"){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if (curentMode === "color"){
        this.style.backgroundColor = penColor.value;
    }
    else if (currentMode === 'eraser') {
        square.style.backgroundColor = bgColor.value
      }
}
