const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
//찾기
const gameContainer = document.body.querySelector('#gameContainer');
const StartBtn = document.body.querySelector('.StartBtn');
const RestartBtn = document.body.querySelector('.ReStartBtn');
const score = document.body.querySelector('#score');
const roulette = document.body.querySelector('#roulette');
const rouletteImg = document.body.querySelector('#rouletteImg');
//변수
const savedUserDate=localStorage.getItem("Date");
let locates = [];
let colors = [];
let chekReCall = 1;
let userSelect = [];
let chekAnswer = 0;
let clickTimes = 0;
let today = new Date();
let day = today.getDate();
//string
const HIDDEN_CLASS="hidden";

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

function rouletting(){
    const explan = ["강제 여행 가능(단, 특수상황 제외)","5분-수제 마사지","기타, 플룻 뭐 아무거나 하기","노래 한 곡 부르기(단, 8시 이전)","간식 사옴","좋은 말","절","손 하트","사랑합니다"]
    const gift = ["납치권", "마사지", "재롱잔치", "노래 한 곡", "간식사기", "덕담", "절", "하트", "사랑합니다"];
    const pbt = [0, (25000 + (1875*chekReCall)), (75000 + (3750*chekReCall)), (125000 + (3750*chekReCall)) ,(200000+(5625*chekReCall)), (300000+(7500*chekReCall)), (400000+(7500*chekReCall)), (400000+(7500*chekReCall)) + Math.floor((1000000 - ((25000 + (1875*chekReCall)) + (50000 + (3750*chekReCall)) + (50000 + (3750*chekReCall)) + (75000+(5625*chekReCall)) + (100000+(7500*chekReCall)) + (100000+(7500*chekReCall)))) / 3), (400000+(7500*chekReCall)) + (2 * Math.floor((1000000 - ((25000 + (1875*chekReCall)) + (50000 + (3750*chekReCall)) + (50000 + (3750*chekReCall)) + (75000+(5625*chekReCall)) + (100000+(7500*chekReCall)) + (100000+(7500*chekReCall)))) / 3)), 1000000 ];
    let ranNum = Math.floor((Math.random() * 999999) + 1);
    let userGift = [];
    for (let i = 0; i < gift.length; i++) {
        if(pbt[i] < ranNum){
            if(ranNum <= pbt[i + 1]){
                userGift = [gift[i], explan[i]];
            }
        }
    }
    roulette.classList.remove(HIDDEN_CLASS);
    roulette.classList.add("roulette");
    roulette.querySelector(".s1").innerHTML = userGift[0];
    roulette.querySelector(".s2").innerHTML = userGift[1];
    rouletteImg.classList.remove(HIDDEN_CLASS);
    rouletteImg.classList.add("rouletteImg");
    setTimeout(()=> {
        roulette.classList.add(HIDDEN_CLASS);
        roulette.classList.remove("roulette");
        rouletteImg.classList.add(HIDDEN_CLASS);
        rouletteImg.classList.remove("rouletteImg");
    }, 2000)
    localStorage.setItem("Date", day);
}

function stop() {
    gameContainer.classList.remove("gameContainer");
    gameContainer.classList.add(HIDDEN_CLASS);
    score.classList.add("score");
    score.classList.remove(HIDDEN_CLASS);
    score.querySelector(".s1").innerHTML = '땡!';
    score.querySelector(".s2").innerHTML = `당신의 점수는 ${chekReCall - 1}점 입니다`;
    console.log(Number(savedUserDate) !== day);
    if(Number(savedUserDate) !== day) {
        rouletting();
    }
}

function answering() {
    userSelect = [];
    clickTimes = 0;
    gameContainer.addEventListener("mousedown", (current) => {current.target.classList.add("makeDarker")});
    gameContainer.addEventListener("mouseup", (current) => {current.target.classList.remove("makeDarker")});
    gameContainer.addEventListener("click", (current) => {
        clickTimes += 1;
        userSelect.push(current.target.id);
        if ((clickTimes / chekReCall) == locates.length) {
            if (arraysSame(trimmingNDrainage(userSelect, chekReCall), tirmWhitI(locates))) {
                chekReCall += 1;
                setTimeout(() => {
                    makingCoordinate();
                }, 500);
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
    if(chekReCall == 1){
        for (let i = 0; i < 3; i++){
            do{
                number = Math.floor(Math.random() * 16 + 1);
            }
            while(number ==  locates[locates.length - 1]);
            locates.push(number);
            colors.push(randomColor);
        }  
    } else{
        do{
            number = Math.floor(Math.random() * 16 + 1);
        }
        while(number ==  locates[locates.length - 1]);
        locates.push(number);
        colors.push(randomColor);
    }
    const wait = await coloring();
    if (wait == true) {
        answering();
    }
}

function start() {
    score.classList.remove("score");
    score.classList.add(HIDDEN_CLASS);
    gameContainer.classList.remove(HIDDEN_CLASS);
    gameContainer.classList.add("gameContainer");
    StartBtn.classList.add(HIDDEN_CLASS);
    makingCoordinate();
};

StartBtn.addEventListener("click", start);
RestartBtn.addEventListener("click", () => {
    location.reload();
});