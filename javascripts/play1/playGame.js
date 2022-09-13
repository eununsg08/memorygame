const gameContainer = document.body.querySelector('#gameContainer');
const StartBtn = document.body.querySelector('.StartBtn');
const RestartBtn = document.body.querySelector('.ReStartBtn');
const score = document.body.querySelector('#score');
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
let locates = [];
let colors = [];
let chekReCall = 1;
let userSelect = [];
let chekAnswer = 0;
let clickTimes = 0;

function arraysSame(arr1, arr2) { //모두 일치
    for (let i = 0; i < arr2.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function tirmWhitI(arr) {
    return arr.map(function (el) {
        return `i${el}`
    });
}

const trimmingNDrainage = (a, n) => {
    let trimedCoordinates = []
    for (let i = 0; i < a.length; i++) {
        if (i % n == 0) {
            trimedCoordinates.push(a[i]);
        }
    }
    return trimedCoordinates;
}

function stop() {
    gameContainer.classList.remove("gameContainer");
    gameContainer.classList.add("hidden");
    score.classList.add("score");
    score.classList.remove("hidden");
    score.querySelector(".s1").innerHTML = "틀렸습니다";
    score.querySelector(".s2").innerHTML = `당신의 점수는 ${chekReCall - 1}점 입니다`;
    locates = [];
    colors = [];
    chekReCall = 1;
    userSelect = [];
    chekAnswer = 0;
    clickTimes = 0;
}

function answering() {
    userSelect = [];
    clickTimes = 0;
    gameContainer.addEventListener("mousedown", (current) => {current.target.classList.add("makeDarker")});
    gameContainer.addEventListener("mouseup", (current) => {current.target.classList.remove("makeDarker")});
    gameContainer.addEventListener("click", (current) => {
        console.log(userSelect);
        console.log(chekReCall);
        clickTimes += 1;
        userSelect.push(current.target.id);
        if ((clickTimes / chekReCall) == locates.length) {
            if (arraysSame(trimmingNDrainage(userSelect, chekReCall), tirmWhitI(locates))) {
                chekReCall += 1;
                makingCoordinate();
            } else {
                stop();
            }
        }
    })
}

async function coloring() {
    gameContainer.classList.add('cantClick');
    for (let i = 0; i < locates.length; i++) {
        let locate = document.body.querySelector(`#i${locates[i]}`); //자리 찾기
        locate.classList.add(`C${colors[i]}`); //색추가
        await wait(900);
        locate.classList.remove(`C${colors[i]}`);
        if(i !== (locates.length - 1)){
            await wait(150);
        }
    }
    gameContainer.classList.remove('cantClick');
    return true;
}

const makingCoordinate = async () => {
    let number = Math.floor(Math.random() * 16 + 1);
    let randomColor = Math.floor(Math.random() * 4); //랜던 4가지 색
    do{
        number = Math.floor(Math.random() * 16 + 1);
    }
    while(number ==  locates[locates.length - 1]);
    locates.push(number);
    colors.push(randomColor);
    const wait = await coloring();
    if (wait == true) {
        answering();
    }
}

function start() {
    score.classList.remove("score");
    score.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    gameContainer.classList.add("gameContainer");
    StartBtn.classList.add("hidden");
    makingCoordinate();
};

StartBtn.addEventListener("click", start);
RestartBtn.addEventListener("click", () => {
    location.reload();
});