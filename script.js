let grid = document.querySelector(".grid");
let strtBtn = document.querySelector(".start-btn");
let allCells;
let show = false;
let gameRunning = false;

let colors = [
    "red",
    "green",
    "lightblue",
    "lightgreen",
    "purple",
    "orange",
    "pink",
    "brown",
    "red",
    "green",
    "lightblue",
    "lightgreen",
    "purple",
    "orange",
    "pink",
    "brown",
];

let cellObj = [];

//create cells in grid
for (let i = 0; i < 16; i++) {
    let cell = document.createElement("div");
    cell.classList.add("grid-cell");

    //get random color from colors array
    //remove that color from array
    //apply the color to the cell
    let randColIdx = Math.floor(Math.random() * colors.length);
    let randColor = colors[randColIdx];
    colors.splice(randColIdx, 1);
    cell.setAttribute("color", randColor);
    // cell.style.backgroundColor = randColor;

    //push an object containing the cell info in the db array
    let cellDet = {
        id: i + 1,
        color: randColor,
    };
    cellObj.push(cellDet);
    grid.appendChild(cell);

    cell.addEventListener("click", handleCellClick);
}

console.log(cellObj);

allCells = document.querySelectorAll(".grid-cell");
if (show) {
    for (let i = 0; i < 16; i++) {
        allCells[i].style.backgroundColor = cellObj[i].color;
    }
}

strtBtn.addEventListener("click", function () {
    show = true;
    gameRunning = true;
    if (show) {
        for (let i = 0; i < 16; i++) {
            allCells[i].style.backgroundColor = cellObj[i].color;
        }
    }
    setTimeout(function () {
        show = false;
        if (show) {
            for (let i = 0; i < 16; i++) {
                allCells[i].style.backgroundColor = cellObj[i].color;
            }
        } else {
            for (let i = 0; i < 16; i++) {
                allCells[i].style.backgroundColor = "gray";
            }
        }
    }, 1500);
});

let clickNo = 0;
let currColor = "none";
function handleCellClick(e) {
    let currElem = e.currentTarget;
    let clickedColor = currElem.getAttribute("color");

    //First click
    if (clickNo == 0) {
        currColor = clickedColor;
        clickNo = 1;
    }

    //Match on the second color
    else if (clickNo == 1) {
        if (clickedColor == currColor) {
            console.log("matched");
            clickNo = 0;
        } else {
            console.log("not a match");
            currColor = "none";
            clickNo = 0;
        }
    }
    console.log(clickedColor);
    console.log(currColor);
}
