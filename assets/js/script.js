const boxs = document.querySelectorAll('.box');
let msg = document.querySelector('#status');
const playBtn = document.querySelector('#playBtn');
const stopBtn = document.querySelector('#resetBtn');
let x = '<img src="./assets/img/x.png" alt="xIcon" class="w-full h-full" />'
let o = '<img src="./assets/img/circle.png" alt="oIcon" class="w-full h-full"/>'
let winChances = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = x;
let player = 'X';
let isGameStart = false;

start();

function start(){
    boxs.forEach(box => {
        box.addEventListener('click', boxClick)
        stopBtn.addEventListener('click', reset)
        isGameStart = true;
        msg.textContent = `Now your turn ${player}`

    })
}

function boxClick(){
    let index = (this.dataset.num);
    if(options[index]!="" || !isGameStart){
        return;
    }
    updateBox(this,index)
}

function updateBox(box, num){
    options[num]=player;
    box.innerHTML =currentPlayer;
    checkWinner()
}

function checkWinner(){
    let isWon = false;
    for(let i=0; i<winChances.length; i++){
        condition = winChances[i];
        box1 = options[condition[0]];
        box2 = options[condition[1]];
        box3 = options[condition[2]];

        if(box1 == '' || box2 == '' || box3 == ''){
            continue;
        }
        if(box1==box2 && box2==box3){
            isWon = true; 
            boxs[condition[0]].classList.add('bg-green-600');
            boxs[condition[1]].classList.add('bg-green-600');
            boxs[condition[2]].classList.add('bg-green-600');
        }
    }

    if(isWon){
        msg.textContent = `congratulations🎉 ${player} won the match`;
        isGameStart = false;

    }
    else if(!options.includes("")){
        msg.textContent = 'Oops 😌 Game Draw. Play again..!';
        isGameStart = false;
    }
    else{
        changePlayer();
    }
}

function changePlayer(){
    player = (player=='X')? 'O' : 'X';
    currentPlayer = (currentPlayer==x) ? o : x;
    msg.textContent = `Now your turn ${player}`
}

function reset(){

    console.log('stopped');
    options = ["", "", "", "", "", "", "", "", ""]
    currentPlayer = x;
    player = 'X';
    isGameStart = true;
    msg.textContent = `Now your turn ${player}`

    boxs.forEach(box => {
        box.innerHTML = ''
        box.classList.remove('bg-green-600')
    })
}


