let grid = document.querySelector(".grid");
let strtBtn = document.querySelector(".start-btn");
let btnCont = document.querySelector(".btns");
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
    cell.setAttribute("id", i);
    // cell.style.backgroundColor = randColor;

    //push an object containing the cell info in the db array
    let cellDet = {
        id: i,
        color: randColor,
        found: false,
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
    strtBtn.innerText = "Playing ..";
    if (gameRunning) {
        strtBtn.setAttribute("disabled", true);
    }
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
                allCells[i].style.backgroundColor = "rgb(180, 180, 180)";
            }
        }
        startTimer();
    }, 2000);
});

let clickNo = 0;
let currColor = "none";
let firstClickElem;
function handleCellClick(e) {
    if (gameRunning == true) {
        let currElem = e.currentTarget;
        let clickedColor = currElem.getAttribute("color");
        let clickedId = currElem.getAttribute("id");
        //First click
        if (clickNo == 0) {
            //save first clicked elem
            firstClickElem = currElem;
            //save first clicked color
            currColor = clickedColor;
            //change color on ui
            currElem.style.backgroundColor = clickedColor;
            clickNo = 1;
        }

        //Match on the second color
        else if (clickNo == 1) {
            //Check for a match
            //if -> match
            //else -> not a match
            if (clickedColor == currColor) {
                currElem.style.backgroundColor = clickedColor; //change color on ui
                let firstId = firstClickElem.getAttribute("id"); //get the id of element we were mathing with
                cellObj[firstId].found = true; //set found true for both
                cellObj[clickedId].found = true;
                console.log("matched");
                clickNo = 0; //reset click counter
            } else {
                currElem.style.backgroundColor = clickedColor;
                gameRunning = false; //disable click for the time
                setTimeout(function () {
                    firstClickElem.style.backgroundColor = "rgb(180, 180, 180)"; //after some time reset both cells
                    currElem.style.backgroundColor = "rgb(180, 180, 180)";
                    gameRunning = true; //enable click again after the reset of colors
                }, 500);
                console.log("not a match");
                currColor = "none";
                clickNo = 0;
            }
        }

        //after every click check if game is over
        if (isGameOver()) {
            console.log("gameOver");
            addReplayBtn();
            strtBtn.remove();
            gameRunning = false;
            stopTimer();
        }
    } else {
        console.log("start the game");
    }
}

//if any found value in cellobj is false return false
//false -> game not over
//true -> game over
function isGameOver() {
    for (let x in cellObj) {
        if (cellObj[x].found == false) {
            return false;
        }
    }
    return true;
}

function addReplayBtn() {
    let replayBtn = document.createElement("button");
    replayBtn.innerText = "Replay";
    replayBtn.classList.add("btn");
    replayBtn.classList.add("start-btn");
    btnCont.appendChild(replayBtn);
    replayBtn.addEventListener("click", function () {
        window.location.reload();
    });
}
