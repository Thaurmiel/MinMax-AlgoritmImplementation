document.write("<p>Hi from main.js</p>");
const divSettings = document.getElementById("divSettings");
const divGame = document.getElementById("divGame");
const divDebug = document.getElementById("divDebug");

const buttonAI = document.getElementById("buttonAI");
const buttonPlayer = document.getElementById("buttonPlayer");
const buttonStart = document.getElementById("gameStart");
const buttonTrOne = document.getElementById("bstateOne");
const buttonDeleTable = document.getElementById("bdelTable");

const tableMain = document.getElementById("tableGame");

let textTurn = document.getElementById("firstTurn");
let textAIPoints = document.getElementById("aiPoints");
let textPlayerPoints = document.getElementById("playerPoints");
let textState1 = document.getElementById("stateOne");
let textState2 = document.getElementById("stateTwo");
let textState3 = document.getElementById("stateThree");
let textState4 = document.getElementById("stateFour");


function changeText (targetID, textString){
    document.getElementById(targetID).innerHTML = textString;
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function createString(){
  let returnString =[];
  for(let i=0;i<10;i++)
  {
    returnString.push(randomIntFromInterval(10,20));
  }
  return returnString;
}

let gameStatus = {
    gameString : createString(),
    pointsAI : 0,
    pointsPlayer : 0,
    turnStart : "AI",
    gameStarted : false
}

function clickedAI(){
    gameStatus.turnStart = "AI";
    buttonAI.setAttribute("class","buttonActive");
    buttonPlayer.setAttribute("class","buttonFaded");
    changeText("firstTurn","<strong>"+gameStatus.turnStart+"</strong> will be first")
}

function clickedPlayer(){
    gameStatus.turnStart = "Player";
    buttonAI.setAttribute("class","buttonFaded");
    buttonPlayer.setAttribute("class","buttonActive");
    changeText("firstTurn","<strong>"+gameStatus.turnStart+"</strong> will be first")
}

function clickedStart(){
    gameStatus.gameStarted = true;
    divSettings.hidden = true;
    
}
function processNumber(targetNumber)
{
    targetNumber=parseInt(targetNumber);
    let maxDivider = Math.round(targetNumber/2);
    let answer = 
    {
      targetNumber:targetNumber,
      maxDivider:1
    };
    if(targetNumber%2==0)
    {
        if(targetNumber==2){
          answer.targetNumber=1;
          textState2.innerHTML= answer.maxDivider +" "+answer.targetNumber;
          return answer;
        }
        else{
        answer.targetNumber=targetNumber/maxDivider;
        answer.maxDivider=maxDivider;
        textState2.innerHTML= answer.maxDivider +" "+answer.targetNumber;
        return answer}
    
    }
      else return answer;
}



function generate_table( targetData)
    {
    let cols = targetData.length;
    let rows =2;
    checkString();
    for(let i=0;i<rows;i++)
    {
        
        let row = document.createElement("tr");
        tableMain.appendChild(row);
        for (let j=0;j<cols;j++)
        {
        let cell = document.createElement("td");
        row.appendChild(cell);
        if(i===0){cell.innerHTML=j+1;}

        else
            {
            cell.innerHTML=gameStatus.gameString[j];
            cell.setAttribute("onclick","numberOnClick(this);");
            cell.setAttribute("place",j);
            }
        }
    }
    }

function delete_table(){
    let target = tableMain;
    while(target.hasChildNodes())
    {
        target.removeChild(target.firstChild);
    }
}

buttonTrOne.addEventListener("click",checkString);
buttonDeleTable.addEventListener("click", delete_table);

buttonAI.addEventListener("click", clickedAI);
buttonPlayer.addEventListener("click", clickedPlayer);
buttonStart.addEventListener("click", clickedStart);

function stringValidate(tString, targets){
    for(let i=0;i<tString.length;i++)
    {
        if(targets[i]==1)
        {
            if(i==tString.length-1)
                tString[i-1]+=tString[i];
            else
                tString[i+1]+=tString[i];
        }
    }
    for(let i=0;i<tString.length;i++)
        {
            if(tString[i]==1)
                tString.splice(i,1);
        }
}

function checkString() {
    let target = gameStatus.gameString;
    let checkTarget = [];
    for(let i=0;i<target.length;i++)
    {
        if(target[i]<2){
            checkTarget.push(1);
        }
        else
        {
            checkTarget.push(0);
        }
    }

    
    textState1.innerHTML = checkTarget;

    stringValidate(target,checkTarget);
}

function numberOnClick(target)
    {
    let targetNumber = target.innerHTML;
 
    textState3.innerHTML = targetNumber;
    let answerDict = processNumber(targetNumber);
    target.setAttribute("style","color:red;");
    gameStatus.gameString[target.getAttribute("place")]=answerDict.targetNumber;
    textState4.innerHTML = gameStatus.gameString;
    target.innerHTML = answerDict.targetNumber;
    if(answerDict.maxDivider==1)
        {   
            checkString();
            delete_table();
            generate_table(gameStatus.gameString);
        }
    

    }
    
    generate_table(gameStatus.gameString);
    