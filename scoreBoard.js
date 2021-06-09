function updateList() {
    let presentSc = document.querySelectorAll(".score");
    for (let x = 0; x < presentSc.length; x++) {
        presentSc[x].remove();
    }

    let allScores = JSON.parse(localStorage.getItem("prevBrainScores"));
    let scoreList = document.querySelector(".scoreList");
    console.log(allScores);

    for (let i in allScores) {
        let newLi = document.createElement("li");
        newLi.classList.add("score");
        newLi.innerText = allScores[i];
        scoreList.appendChild(newLi);
    }
}

updateList();
