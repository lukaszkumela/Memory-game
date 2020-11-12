let images = [];
let setOne = [
    "url(images/setOne/eagle.jpg)",
    "url(images/setOne/flamingo.jpg)",
    "url(images/setOne/goose.jpg)",
    "url(images/setOne/hawk.jpg)",
    "url(images/setOne/swallow.jpg)",
    "url(images/setOne/sowa.jpg)",
    "url(images/setOne/swan.jpg)",
    "url(images/setOne/chick.jpg)",
    "url(images/setOne/bigowl.jpg)",
    "url(images/setOne/bweagle.jpg)",
    "url(images/setOne/greenbird.jpg)",
    "url(images/setOne/hover.jpg)",
    "url(images/setOne/toucan.jpg)",
    "url(images/setOne/seagull.jpg)",
    "url(images/setOne/smallbird.jpg)",
    "url(images/setOne/redparrot.jpg)",
    "url(images/setOne/blueparrot.jpg)",
    "url(images/setOne/crow.jpg)",
    "url(images/setOne/blackswan.jpg)",
    "url(images/setOne/tinybird.jpg)",
    "url(images/setOne/duck.jpg)"
];

let setTwo = [
    "url(images/setTwo/astronaut.jpg)",
    "url(images/setTwo/blue.jpg)",
    "url(images/setTwo/eyes.jpg)",
    "url(images/setTwo/hole.jpg)",
    "url(images/setTwo/horizon.jpg)",
    "url(images/setTwo/moon.jpg)",
    "url(images/setTwo/moon2.jpg)",
    "url(images/setTwo/nebula.jpg)",
    "url(images/setTwo/saturn.jpg)",
    "url(images/setTwo/scifi2.jpg)",
    "url(images/setTwo/shuttle.jpg)",
    "url(images/setTwo/spaceship.jpg)",
    "url(images/setTwo/spaceship2.jpg)",
    "url(images/setTwo/station.jpg)",
    "url(images/setTwo/train.jpg)",
    "url(images/setTwo/moon3.jpg)",
    "url(images/setTwo/takeoff.jpg)",
    "url(images/setTwo/system.jpg)",
    "url(images/setTwo/iss.jpg)",
    "url(images/setTwo/desert.jpg)",
    "url(images/setTwo/ufo.jpg)",
    "url(images/setTwo/mysterious.jpg)"
];

let setThree = [
    "url(images/setThree/bear.jpg)",
    "url(images/setThree/beaver.jpg)",
    "url(images/setThree/boar.jpg)",
    "url(images/setThree/butterfly.jpg)",
    "url(images/setThree/chipmunk.jpg)",
    "url(images/setThree/deer.jpg)",
    "url(images/setThree/dragonfly.jpg)",
    "url(images/setThree/elk.jpg)",
    "url(images/setThree/fox.jpg)",
    "url(images/setThree/hedgehog.jpg)",
    "url(images/setThree/lynx.jpg)",
    "url(images/setThree/moose.jpg)",
    "url(images/setThree/rabbit.jpg)",
    "url(images/setThree/snake.jpg)",
    "url(images/setThree/spider.jpg)",
    "url(images/setThree/squirrel.jpg)",
    "url(images/setThree/wolf.jpg)",
    "url(images/setThree/frog.jpg)",
    "url(images/setThree/ladybug.jpg)",
    "url(images/setThree/furry.jpg)"
];

let body = document.querySelector("body");
let boxes = document.getElementsByClassName("box");
let start = document.querySelector("#start");
let gameSize = 16;
let revealedBoxes = [];
let clicks = 0;
let title = document.querySelector("#title");
let time = document.getElementById("time");
let timerText = document.getElementById("timer");
let elapsed = 0;
let timing;
let chosenSet = setOne;
let setOneButton = document.getElementById("first-tileset");
let setTwoButton = document.getElementById("second-tileset");
let setThreeButton = document.getElementById("third-tileset");
let chosenTiles = "var(--first-tiles)";
let easyModeButton = document.querySelector("#easy-mode");
let mediumModeButton = document.querySelector("#medium-mode");
let hardModeButton = document.querySelector("#hard-mode");
let musicButton = document.querySelector("#music-toggle");
let soundButton = document.querySelector("#sound-toggle")
let themeMusic = new Audio("sounds/191725__mika55__synth-loop.mp3");
let clickSound = new Audio("sounds/321082__benjaminnelan__wooden-hover.wav");
let errorSound = new Audio("sounds/371190__plutoniumisotop__lock.wav")
let foundSound = new Audio("sounds/325805__wagna__collect.wav");
let victorySound = new Audio("sounds/258142__tuudurt__level-win.wav");
let beepSound = new Audio("sounds/350876__cabled-mess__coin-c-09.wav")
let musicMuted = false;
let soundMuted = false;
let confirmButton = document.querySelector("#confirm-button");
let mainGrid = document.querySelector("#main-grid");
let victoryScreen = document.querySelector("#victory-screen");

const chooseImages = () => {
    let chosenImage;
    images = [];
    for (let numberOfImages = 0; numberOfImages < (gameSize / 2); numberOfImages++) {
        while(true) {
            chosenImage = chosenSet[Math.floor(Math.random()*chosenSet.length)]
            if (images.indexOf(chosenImage) == -1) {
                images.push(chosenImage);
                images.push(chosenImage);
                break;
            }
        }
    }
}


const randomizeImages = () => {
    chooseImages();
    const shuffle = array => {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    images = shuffle(images);
}


const reset = () => {
    mainGrid.style.display = "grid";
    victoryScreen.style.display = "none";
    revealedBoxes = [];
    clicks = 0;
    clearInterval(timing);
    elapsed = 0;
    time.innerText = "0";
    start.style.display = "none";
    timerText.style.display = "none";
    document.querySelector("#tile-select").style.display = "flex";
    document.querySelector("#difficulty").style.display = "flex";
    document.querySelector("#music").style.display = "flex";
    title.style.width = "50vw";
    title.textContent = "";
    title.classList.add("animated");
    for (let i=0; i<boxes.length; i++) {
        boxes[i].classList.remove("found");
        boxes[i].style.backgroundImage = chosenTiles;
    }
}


const addEvents = () => {
    for (let i=0; i<boxes.length; i++) {
        boxes[i].addEventListener("click", function() {
            let selectedBox = this;
            let num = parseInt(this.id.match(/[0-9]+/g));
            start.style.display = "flex";
            document.querySelector("#tile-select").style.display = "none";
            document.querySelector("#difficulty").style.display = "none";
            document.querySelector("#music").style.display = "none";
            timerText.style.display = "block";
            if (clicks == 0) {
                timing = setInterval(timer, 1000);
                title.classList.remove("animated");
                title.textContent = " ";
                setTimeout(()=> {
                title.textContent = "";
            }, 2000)
            }
            if (revealedBoxes[0] != selectedBox) {
                click();
                clicks++;
                if (revealedBoxes.length < 2) {
                    selectedBox.style.backgroundImage = images[num - 1];
                    revealedBoxes.push(selectedBox);
                }
                if (revealedBoxes.length == 2) {
                    if (revealedBoxes[0].style.backgroundImage != revealedBoxes[1].style.backgroundImage) {
                        
                        for (let a=0; a<boxes.length; a++) {
                            boxes[a].classList.add("pointer-none");
                        }
                        setTimeout(function() {
                            for (let b=0; b<boxes.length; b++) {
                                boxes[b].classList.remove("pointer-none");
                                if (soundMuted == false) {
                                    errorSound.play();
                                }
                            }
                            revealedBoxes.forEach(box => box.style.backgroundImage = chosenTiles)
                            revealedBoxes = [];
                        }, 550);
                    }
                    else if (revealedBoxes[0].style.backgroundImage == revealedBoxes[1].style.backgroundImage) {
                        revealedBoxes[0].classList.add("found");
                        revealedBoxes[1].classList.add("found");
                        if (soundMuted == false) {
                            foundSound.pause();
                            foundSound.currentTime = 0;
                            foundSound.volume = 0.3;
                            foundSound.play();
                        }
                        revealedBoxes = [];
                    }
                }
            }
        victoryCheck();
    }
        )};
};

const victoryCheck = () => {
    let victory = 0;
    for (let i=0; i<boxes.length; i++) {
        if (boxes[i].classList.contains("found")) {
            victory++;
        }
    if (victory == gameSize) {
        clearInterval(timing);
        title.style.width = "80vw";
        title.style.marginRight = "0";
        themeMusic.pause();
        if (soundMuted == false) {
            victorySound.volume = 0.3;
            victorySound.play();
        }
        victoryScreenOn();
        setTimeout(playMusic, 9000);
        title.textContent = `BOOM !!!`;
    }
    }
}
const bling = (value, textNode, time, basis) => {
    return new Promise((resolve, reject) => {    
        let increase = 0;
        const countUp = (value, textNode) => {
            if (increase === value || victoryScreen.style.display === "none") {
                clearInterval(counting);
                resolve();
            }
            else {
                increase += basis;
                textNode.innerText = increase;
                if (!soundMuted) {
                    if (value > 500) {
                        beepSound.play();
                    }
                    else clickSound.play();
                }
            }
        }
    let counting = setInterval(countUp, time, value, textNode);
    });
}

const victoryScreenOn = () => {
    let scoreText = document.querySelector("#score");
    let timeScoreText = document.querySelector("#time-score");
    let clicksText = document.querySelector("#click-score");
    let score = (gameSize * 625 - (Math.round((elapsed + clicks * 2)/3)*100));
    const awardStars = () => {
        if (gameSize === 16) {
            if (score <=2000) return 1;
            if (score <=4000) return 2;
            if (score <=6000) return 3;
            if (score <=8000) return 4;
            if (score > 8000) return 5;
                }
        else if (gameSize === 24) {
            if (score <=4000) return 1;
            if (score <=6000) return 2;
            if (score <=8000) return 3;
            if (score <=10000) return 4;
            if (score > 10000) return 5;
                }
        else if (gameSize === 36) {
            if (score <=9000) return 1;
            if (score <=11000) return 2;
            if (score <=13000) return 3;
            if (score <=16000) return 4;
            if (score > 16000) return 5;
                }
            }
    mainGrid.style.display = "none";
    timeScoreText.innerText = elapsed;
    clicksText.innerText = clicks;
    resetVictory();
    victoryScreen.style.display = "flex";
    
    bling(elapsed, timeScoreText, 50, 1)
        .then(()=> bling(clicks, clicksText, 50, 1)
            .then(()=> bling(score, scoreText, 7.5, 25)
                .then(()=> drawStars(awardStars()))));

    const drawStars = (starNumber) => {
    let goldenStar = "<img src='./images/backgrounds/star2.svg' alt='a golden star'>";
        for (let i=1; i <= starNumber; i++) {
        setTimeout(()=> {
            let currentStar = "#star" + i.toString();
            document.querySelector(currentStar).innerHTML = goldenStar;
            victoryScreen.style.display != "none" ? beepSound.play(): null;
            }, i * 500)  
        }
    }
}

const resetVictory = () => {
    document.querySelector("#score").innerText = "0";
    document.querySelector("#time-score").innerText = "0";
    document.querySelector("#click-score").innerText = "0";
    for (let k=1; k<6; k++) {
        let currentStar = "#star" + k.toString();
        document.querySelector(currentStar).innerHTML = "<img src='./images/backgrounds/blackStar.svg' alt='a black star'>";
    }
}


const playMusic = () => {
    themeMusic.loop = true;
    themeMusic.volume = 0.25;
    if (!musicMuted) {
        themeMusic.currentTime = 0;
        themeMusic.play();  
    }
    else {
        themeMusic.pause();
        themeMusic.currentTime = 0;
    }
}

errorSound.volume = 0.25;

const click = () => {
    clickSound.volume = 0.2;
    if (soundMuted == false) { 
    clickSound.play();
    }
}

const timer = () => {
    elapsed++;
    time.textContent = elapsed.toString();
}


const gameDifficulty = (boardSize) => {
    let game = document.querySelector("#main-grid");
    let newDiv;
    game.innerHTML = "";
    gameSize = boardSize;
    for (n=1; n<boardSize+1; n++) {
        newDiv = document.createElement("div");
        newDiv.classList.add("box");
        newDiv.id = "box" + n;
        game.appendChild(newDiv);
        }
    boxes = document.getElementsByClassName("box");
    if (gameSize == 16) {
        game.classList.remove("six-columns");
        game.classList.remove("nine-columns");
        game.classList.add("four-columns");
    }
    if (gameSize == 24) {
        game.classList.add("six-columns");
        game.classList.remove("nine-columns");
        game.classList.remove("four-columns");
    }
    if (gameSize == 36) {
        game.classList.remove("six-columns");
        game.classList.add("nine-columns");
        game.classList.remove("four-columns");
    }
    addEvents();
    randomizeImages();
    reset();
}

const cacheSet = set => {
    set.forEach(imageUrl => {
        let img = new Image();
        readyImg = imageUrl.replace("url(","").replace(")","");
        img.src = readyImg;
    }
    )
}


addEvents();
randomizeImages();
cacheSet(setOne.concat(["images/backgrounds/star2.svg", "images/backgrounds/seaclouds.jpg"]));
start.addEventListener("click", randomizeImages);
start.addEventListener("click", reset);
start.addEventListener("click", click);
setOneButton.addEventListener("click", () => {
    cacheSet(setOne.concat(["images/backgrounds/star2.svg", "images/backgrounds/seaclouds.jpg"]));
    click();
    chosenSet = setOne;
    chosenTiles = "var(--first-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--first-background)";
    setOneButton.style.backgroundColor = "rgba(97,76,131,0.6)";
    setTwoButton.style.backgroundColor = "transparent";
    setThreeButton.style.backgroundColor = "transparent";
});
setTwoButton.addEventListener("click", () => {
    cacheSet(setTwo.concat(["images/backgrounds/star2.svg", "images/backgrounds/stars.jpg"]));
    click();
    chosenSet = setTwo;
    chosenTiles = "var(--second-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--second-background)";
    setOneButton.style.backgroundColor = "transparent";
    setTwoButton.style.backgroundColor = "rgba(97,76,131,0.6)";
    setThreeButton.style.backgroundColor = "transparent"
});
setThreeButton.addEventListener("click", () => {
    cacheSet(setThree.concat(["images/backgrounds/star2.svg", "images/backgrounds/conifer.jpg"]));
    click();
    chosenSet = setThree;
    chosenTiles = "var(--third-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--third-background)";
    setThreeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    setOneButton.style.backgroundColor = "transparent";
    setTwoButton.style.backgroundColor = "transparent";
});
easyModeButton.addEventListener("click", () => {
    click();
    gameDifficulty(16);
    easyModeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    mediumModeButton.style.backgroundColor = "transparent";
    hardModeButton.style.backgroundColor = "transparent";
});
mediumModeButton.addEventListener("click", () => {
    click();
    gameDifficulty(24);
    easyModeButton.style.backgroundColor = "transparent";
    mediumModeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    hardModeButton.style.backgroundColor = "transparent";

});
hardModeButton.addEventListener("click", ()=> {
    click();
    gameDifficulty(36);
    easyModeButton.style.backgroundColor = "transparent";
    mediumModeButton.style.backgroundColor = "transparent";
    hardModeButton.style.backgroundColor = "rgba(97,76,131,0.7)";
});

musicButton.addEventListener("click", () => {
    click();
    if (musicMuted === true) {
        musicMuted = false;
        musicButton.style.backgroundColor = "rgba(97,76,131,0.7)";
        playMusic();
    }
    else {
        musicMuted = true;
        musicButton.style.backgroundColor = "transparent";
        playMusic();
    }
});

soundButton.addEventListener("click", () => {
    if (soundMuted === true) {
        soundMuted = false;
        soundButton.style.backgroundColor = "rgba(97,76,131,0.7)";
    }
    else {
        soundMuted = true;
        soundButton.style.backgroundColor = "transparent";
    }
    click();

});

confirmButton.addEventListener("click", ()=> {
    document.querySelector("#start-overlay").style.backgroundColor = "transparent";
    document.querySelector("#start-overlay").style.transform = "scale(0)";
    setTimeout(playMusic, 1000);
});


