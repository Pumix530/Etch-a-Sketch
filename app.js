// Change of slider text 
const slider = document.querySelector(".slider");
const slider_value = document.querySelector('.slider_value');
const slider2_value = document.querySelector('.slider_value2');

slider.addEventListener('input', function(){
    slider_value.textContent = slider.value;
    slider2_value.textContent = slider.value;
});



//Change the rows and columns of grid

function girdSize(size){
    const grid = document.querySelector(".grid");
    let squares = grid.querySelectorAll('div')

    //This removes div 
    squares.forEach((div) => div.remove())
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`


    let amount = size * size
    for (let i = 0; i < amount; i++){
        let square = document.createElement("div");
        square.addEventListener('mousedown', colorSquare);
        square.classList.add("square");
        square.style.backgroundColor = 'white';
        grid.insertAdjacentElement("beforeend", square);
    }
}

let bgColor = document.querySelector(".background_picker")
let squares = document.querySelectorAll(".square")
bgColor.addEventListener('click', function(){
    for (let i = 0; i < squares.length; i++){
    squares.style.backgroundColor = bg.value;
}
});

girdSize(16);

function changeSize(input){
    girdSize(input)
}


function colorSquare(){
    let penColor = document.querySelector(".pen_picker")
    this.style.backgroundColor = penColor.value
}