// =======================
// ====== VARIABLES ======
// =======================

var colorBox = document.querySelectorAll("#colorBox");
var randomButton = document.querySelector("#randomButton");
var winText = document.querySelector("#winText");
var colorText = document.querySelector("#colorText");
var heart = document.querySelectorAll("#heart");
var easyButton = document.querySelector("#easyMode");
var hardButton = document.querySelector("#hardMode");
var boxNumber;
var wrongCount = 0;
var isWinner = false;
var isHard = true;

// =======================
// ====== FUNCTIONS ======
// =======================

// RESPONSIVE BOXES

function resizeBoxes() {
    for(var i = 0; i < colorBox.length; i++) {
        colorBox[i].style.height = colorBox[i].offsetWidth * 0.8 + "px";
    }
}

// RANDOM GENERATORS

function randGenerate(range) {
    var randomNumber = Math.round(Math.random() * range);
    return randomNumber;
}

function randRGB() {
    var randomR = randGenerate(255);
    var randomG = randGenerate(255);
    var randomB = randGenerate(255);
    return `rgb(${randomR},${randomG},${randomB})`;
}

function generateRandColorArray(amount) {
    var colorArray = new Array();
    for(var i = 0; i < amount; i++) {
        colorArray[i] = randRGB();
    }
    return colorArray;
}

function setColorToElements(elementArray, colorArray) {
    for(var i = 0; i < elementArray.length; i++) {
        elementArray[i].style.backgroundColor = colorArray[i];
    }
}

function randomIndexPicker(array) {
    if(isHard) {
        return randGenerate(array.length - 1);
    }
    else {
        return randGenerate(Math.floor(array.length/2) - 1);
    }
}

// GAME OPERATIONS

function returnHearts() {
    for(var i = 0; i < heart.length; i++) {
        if(isHard) {
            heart[i].style.display = "inline-block";
        }
        else {
            heart[i].style.display = "inline-block";
            easyModeKillHeart();
        }
    }
}

// BASIC FUNCTIONALITY

function gameFunction() {
    resetGame();
    returnHearts();
    resizeBoxes();
    winText.innerText = "Select a color you think matches:"
    boxNumber = randomIndexPicker(colorBox);
    colorArray = generateRandColorArray(colorBox.length);
    setColorToElements(colorBox, colorArray);
    colorText.innerHTML = colorArray[boxNumber];
}

function resetGame() {
    resizeBoxes();
    wrongCount = 0;
    if(isHard) {
        for(var i = 0; i < colorBox.length; i++) {
            colorBox[i].style.display = "block";
        }
    }
    else {
        for(var i = 0; i < Math.floor((colorBox.length)/2); i++) {
            colorBox[i].style.display = "block";
        }
        for(var i = Math.floor((colorBox.length)/2); i < colorBox.length; i++) {
            colorBox[i].style.display = "none";
        }
    }    
}

// MODE SELECTION 

function easyModeKillHeart() {
    heart[0].style.display = "none";
    wrongCount = 1;
}

function easyModeFunc() {
    isHard = false;
    easyModeHideBoxes();
    easyButton.style.opacity = 1 + "px";
    gameFunction();
    easyModeKillHeart();
}

function easyModeHideBoxes() {
    for(var i = Math.floor((colorBox.length)/2); i < colorBox.length; i++)
    {
        colorBox[i].style.display = "none";
    }
}

function hardModeFunc() {
    isHard = true;
    gameFunction();
}

// ===========================
// ====== MAIN FUNCTION ======
// ===========================

gameFunction();

randomButton.addEventListener("click", function() {
    gameFunction();
})

window.addEventListener("resize", resizeBoxes);

easyButton.addEventListener("click", easyModeFunc);
hardButton.addEventListener("click", hardModeFunc);

for(var i = 0; i < colorBox.length; i++) {
    colorBox[i].addEventListener("click", function() {
        if(this.style.backgroundColor == colorBox[boxNumber].style.backgroundColor) {
            isWinner = true;
            winText.innerHTML = "You win!"
            setTimeout(gameFunction, 500);
        }
        else if(wrongCount >= 2) {
            winText.innerHTML = "You lost!";
            setTimeout(gameFunction, 500);
        }   
        else {
            wrongCount++;
            heart[wrongCount - 1].style.display = "none";
            winText.innerHTML = "Try again!"
            this.style.display = "none";
        }
    })
}
