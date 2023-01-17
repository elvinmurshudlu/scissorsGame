let morePlayer = true
let player2 = document.getElementById("player2")
let result = document.querySelector(".reset")
let player3 = player2.cloneNode(true)
    player3.setAttribute("id","player3")
let addPlayer = document.querySelector("#addPlayer")
let doublePoint = document.createElement("span")
doublePoint.innerHTML = " : "
let scoreArea = document.querySelector("#score")
const playerScore = document.querySelector("#player1-score");
const botScore = document.querySelector("#player2-score");
let   bot2Score = botScore.cloneNode(true)
bot2Score.setAttribute("id","player3-score")
let  botShowAreaSecond 
let  botOptionsSecond 
let playerNumber = eval(sessionStorage.getItem("morePlayer"))
const imageFolderPath = "assets";
let resultSection = document.querySelector("#result")
let notificationBar = document.querySelector("#notificationBar")
let gamePopUpMessage = document.querySelector(".gamePopUpMessage")
let lostVideo = document.querySelector("video")

let game = document.querySelector(".game")
// let test = 1
// sessionStorage.setItem("morePlayer","true")

const arr = [
  {
    image: "lizard.png",
    name: "Lizard",
  },
  {
    image: "paper.png",
    name: "Paper",
  },
  {
    image: "rock.png",
    name: "Rock",
  },
  {
    image: "scissor.png",
    name: "Scissor",
  },
  {
    image: "spock.png",
    name: "Spock",
  },
];

if(playerNumber==false && sessionStorage.getItem("Player1Img")!=null){
  // console.log("Profile 3 dene")
  thirdBot()
  for(let a =1;a<=3;a++){
    let imgIndex = sessionStorage.getItem(`Player${a}Img`)
    let showedAreaParentClass = sessionStorage.getItem(`Player${a}ImgSrc`)
    let showedArea = document.querySelector(`#${showedAreaParentClass} .selected-option .option`)
    showPlayerOption(imgIndex,showedArea)
  }
  // playerScore.innerHTML = sessionStorage.getItem("player1-score")
  // botScore.innerHTML = sessionStorage.getItem("player2-score")
  // bot2Score.innerHTML = sessionStorage.getItem("player3-score")
  setScore(playerScore,sessionStorage.getItem("player1-score"))
  setScore(botScore,sessionStorage.getItem("player2-score"))
  setScore(bot2Score,sessionStorage.getItem("player3-score"))

  

}
else  if(playerNumber == true && sessionStorage.getItem("Player1Img")!=null){
  // console.log("Profile 2 dene")
  for(let a =1;a<=2;a++){
    let imgIndex = sessionStorage.getItem(`Player${a}Img`)
    let showedAreaParentClass = sessionStorage.getItem(`Player${a}ImgSrc`)
    let showedArea = document.querySelector(`#${showedAreaParentClass} .selected-option .option`)
    showPlayerOption(imgIndex,showedArea)
  } 
  setScore(playerScore,sessionStorage.getItem("player1-score"))
  // playerScore.innerHTML = sessionStorage.getItem("player1-score")
  setScore(botScore,sessionStorage.getItem("player2-score"))

  // botScore.innerHTML = sessionStorage.getItem("player2-score")
  // sessionStorage.setItem("NotFirstSession","true")
}else{
  sessionStorage.setItem("morePlayer","true")

}

function setScore(player,score){
  console.log(player,score)
  if(score ==null){
    player.innerHTML = 0
  }else{
    player.innerHTML = score
  }
}



const rule = {
  Lizard: ["Spock", "Paper"],

  Paper: ["Rock", "Spock"],

  Rock: ["Lizard", "Scissor"], /////////

  Scissor: ["Paper", "Lizard"], //////////

  Spock: ["Scissor", "Rock"],
};

const player1Options = document.querySelectorAll(
  "#player1 .available-options .option"
);

const botOptions = document.querySelectorAll(
  "#player2 .available-options .option"
);


const playerShowArea = document.querySelector(
  "#player1 .selected-option .option"
);

const botShowArea = document.querySelector("#player2 .selected-option .option");


const roundMessage = document.querySelector("#round-message");

player1Options.forEach((e) => {
  e.addEventListener("click", () => {
    play(e);
  });
});

function reset() {
  sessionStorage.clear()
  game.classList.add("hidden")
  botShowArea.innerHTML = "";
  playerShowArea.innerHTML = "";
  // roundMessage.innerHTML = "Choose your option";
  playerScore.innerHTML = 0;
  botScore.innerHTML = 0;
  bot2Score.innerHTML = 0;
  player1Options.forEach((e) => {
    // console.log(e);
    e.classList.remove("active");
  });
  botOptions.forEach((e) => {
    // console.log(e);
    e.classList.remove("active");
  });
  if(!morePlayer){
    botShowAreaSecond.innerHTML = "";    
    botOptionsSecond.forEach((e) => {
      // console.log(e);
    e.classList.remove("active");
    });
  }
}

document.querySelector(".reset").addEventListener("click", reset);

function play(e) {
  // if(test ==1 && playerNumber==true){
  //   console.log("testtt")
  //   sessionStorage.setItem("morePlayer","true")
  //   test--
  // }
  const player1 = e.getAttribute("data-index");

  const length = arr.length;

  const player2 = Math.floor(Math.random() * length);
  const player3 = Math.floor(Math.random() * length);

  showPlayerOption(player1, playerShowArea,1);
  highlightSelectedOption(player1, player1Options);

  showPlayerOption(player2, botShowArea,2);
  highlightSelectedOption(player2, botOptions);

  if(!morePlayer){
    
    
    showPlayerOption(player3, botShowAreaSecond,3);
    highlightSelectedOption(player1, botOptionsSecond);
    return calculateScore(player1, player2,player3);
  }

  
  


  return calculateScore(player1, player2);
}


//! Generate an image element (generateImgElement with index)
function generateImgElement(index) {
  const { image, name } = arr[index];
  const imgElement = document.createElement("img");
  imgElement.src = `${imageFolderPath}/${image}`;
  imgElement.alt = name;
  imgElement.title = name;
  return imgElement;
}

//! Show selected option (showPlayerOption with index and showArea)
function showPlayerOption(index, showArea,playerPosition=null) {
  
  if(playerPosition!=null){
    sessionStorage.setItem(`Player${playerPosition}Img`,`${index}`)
    sessionStorage.setItem(`Player${playerPosition}ImgSrc`,`${showArea.parentNode.parentNode.id}`)
  } 


  const imgElement = generateImgElement(index);  
  showArea.innerHTML = "";
  showArea.append(imgElement);




}

//! highlightSelectedOption function with index and options array
function highlightSelectedOption(index, options) {
  options.forEach((e) => {
    e.classList.remove("active");
  });
  options[index].classList.add("active");
}

//! Show the message (showMessage with msg)
function showMessage(msg,player) {
  // roundMessage.innerText = "";
  // roundMessage.innerText = msg;
  let roundMessage = document.createElement("p")
  roundMessage.style.fontSize = "30px"
  roundMessage.innerHTML = msg
  messageBox(roundMessage,player)
}

//! Claculate function for player 1, player 2 scores (calculateScore with player1, player2)
function calculateScore(player1, player2,player3=0) {
  const player1Choice = arr[player1].name;
  const player2Choice = arr[player2].name;  
  let player3Choice = arr[player3].name;

  const player3Strength = rule[player3Choice];  
  const player2Strength = rule[player2Choice];  
  const player1Strength = rule[player1Choice];

  if(!morePlayer){
    let choicesObj = {}
    choicesObj["Player"] = player1Choice
    choicesObj["Bot"] = player2Choice
    choicesObj["Bot2"] = player3Choice   
    let choices = Object.values(choicesObj)
    let players = Object.keys(choicesObj)    
    let totalStrength = player1Strength.concat(player2Strength).concat(player3Strength)
    let winner = []    
    choices.forEach((choice)=>{      
      if(!totalStrength.includes(choice)){
        winner.push(choice)
      }
    })
    
    if(winner.length ==0){
      showMessage("Qarşılıqlı uduzdunuz")
    }else if(winner.length == 1){
      let winnerPlayer = players.find((player)=>choicesObj[player] == winner[0])
      showMessage(`${winnerPlayer} is winner!!`,winnerPlayer)
      
      // console.log(winnerPlayer,"OriginalName")
      // console.log(winnerPlayer.toLowerCase(),"Lowered Name")
      // console.log(`${winnerPlayer.toLowerCase()}Score`,"Score added name")

      addScore(eval(`${winnerPlayer.toLowerCase()}Score`))

    }else if(winner.length ==2){
      let draw = ""
      let andWrite = true
      players.forEach((player)=>{
        if(choicesObj[player] == winner[0]){
          if(andWrite){
            draw += player + " and "
            andWrite = false
          }
          else{
            draw += player + " "
          }
        }
      })
      

      showMessage(`${draw}is draw!!`)
    }else{
      showMessage("Hamısı bərabərdirr")
    }


  }else{
    if (player1Choice === player2Choice) {
      showMessage("Draw!");
    } else if (player1Strength.includes(player2Choice)) {
      showMessage("Player is winner !","Player");
      addScore(playerScore);
    } else {
      showMessage("Bot is winner !");
      addScore(botScore);
    }
  }
}

//! Change the score (addScore with player)
function addScore(player) {  
  const { innerHTML } = player;
  player.innerHTML = Number(innerHTML) + 1;
  sessionStorage.setItem(`${player.id}`,player.innerHTML)
  scoreWinner(playerScore,botScore)
}

function delayedRestart(){
  setTimeout(()=>{
    reset()
  },4000)
}

//TODO:: *** confity, alert message, storage score, if the difference is 15 and biger, then reset game and new game start, if I want to add a third player option add it ***
function scoreWinner(){
  lostVideo.classList.add("hidden")

  lostVideo.src = ""
  let a = Number(playerScore.innerHTML)
  let b = Number(botScore.innerHTML)
  console.log(a,b)
  if(b-a==5 &&b==20){    
    gamePopUpMessage.innerHTML = "Biyabrciliq"
    lostVideo.src = "./assets/lost.mp4"
    game.classList.remove("hidden")
    lostVideo.classList.remove("hidden")
    delayedRestart()

  }
  if(a==20){
    console.log("winner is a")
    gamePopUpMessage.innerHTML = "You Win"
    game.classList.remove("hidden")  
    delayedRestart()

  }else if (b==20){
    console.log("Winner is b")
    gamePopUpMessage.innerHTML = "Game Over"
    game.classList.remove("hidden")
    delayedRestart()


  }

}

// console.log(result)

function thirdBot(){
  if(morePlayer){
    document.body.insertBefore(player3,result)
    addPlayer.innerHTML = "Remove Player"
    morePlayer = false
    sessionStorage.setItem("morePlayer","false")
    botShowAreaSecond = document.querySelector("#player3 .selected-option .option");
    botOptionsSecond = document.querySelectorAll(
      "#player3 .available-options .option"
    )
    
    scoreArea.appendChild(doublePoint)
    scoreArea.appendChild(bot2Score)
    
    
    ;
  }else{
    document.body.removeChild(player3)
    addPlayer.innerHTML = "Add Player"
    botShowAreaSecond = null
    botOptionsSecond = null
    morePlayer = true
    scoreArea.removeChild(doublePoint)
    scoreArea.removeChild(bot2Score)
    sessionStorage.setItem("morePlayer","true")
  }

  

}
addPlayer.addEventListener("click",thirdBot)

function messageBox(content,player){
  let color
  let opacity =1
  let notificationDiv = document.createElement("div")
  if(player =="Player"){
    color = "green"
  }
  else{color = "red"}


  notificationDiv.style.width = "250px"
  notificationDiv.style.height = "150px"
  notificationDiv.style.borderRadius = "15px"
 
  notificationDiv.style.backgroundColor = `${color}`
  notificationBar.appendChild(notificationDiv)
  
  notificationDiv.style.transition = "2s"
  notificationDiv.style.display = "grid"
  notificationDiv.style.placeContent = "center"

  notificationDiv.appendChild(content)
  setTimeout(()=>{

    let interval = setInterval(()=>{
      notificationDiv.style.opacity = opacity
      opacity -=0.2
      // console.log(opacity)
      if(opacity<0){
        clearInterval(interval)
        notificationBar.removeChild(notificationDiv)
  
      } 
    },500)
    

  },500)
}


