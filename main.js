const divSettings = document.getElementById("divSettings");
const divGame = document.getElementById("divGame");
const divDebug = document.getElementById("divDebug");


const buttonAI = document.getElementById("buttonAI");
const buttonPlayer = document.getElementById("buttonPlayer");
const buttonStart = document.getElementById("gameStart");
const buttonTrOne = document.getElementById("bstateOne");
const buttonDeleteTable = document.getElementById("bdelTable");
const buttonReset =  document.getElementById("resetGame");

const tableMain = document.getElementById("tableGame");

let textTurn = document.getElementById("firstTurn");
let textAIPoints = document.getElementById("aiPoints");
let textPlayerPoints = document.getElementById("playerPoints");
let textGameWins = document.getElementById("gameWins");
/*
let textState1 = document.getElementById("stateOne");
let textState2 = document.getElementById("stateTwo");
let textState3 = document.getElementById("stateThree");
let textState4 = document.getElementById("stateFour");
*/



function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generateString(){
  let returnString =[];
  for(let i=0;i<gameRule.stringSize;i++)
  {
    returnString.push(randomIntFromInterval(10,20));
  }
  return returnString;
}

let gameRule = {
    gameStart : "AI",
    stringSize :8,
    minStringSize : 3,
    maxDepth : 5,
    timeOut:1000* 0.5,
    gameStarted : false
}

let gameStatus;

function resetGameState(){
    gameStatus= new numString();
    divSettings.hidden = false;
    divGame.hidden = true;
    deleteTable();
    generateTable(gameStatus.str);
    gameRule.gameStarted = false;
    tableMain.setAttribute("class","table");
    textGameWins.innerHTML = "";
    buttonReset.setAttribute("class","buttonHidden");
    updatePoints();
}

function gameEnd(){
    gameRule.gameStarted = false;
    let gameEnd=gameStatus.gameOver();
    console.log(gameEnd, "wins");
    tableMain.setAttribute("class","faded");
    
    textGameWins.innerHTML = "Game wins: "+ gameEnd;
    buttonReset.setAttribute("class","buttonActive");
}
function clone(instance) {
    return Object.assign(
      Object.create(
        // Set the prototype of the new object to the prototype of the instance.
        // Used to allow new object behave like class instance.
        Object.getPrototypeOf(instance),
      ),
      // Prevent shallow copies of nested structures like arrays, etc
      JSON.parse(JSON.stringify(instance)),
    );
  }

function createChild(target,numIndex){
    let temp = copyArray(target.str);
    let answer=target.processNumber(temp[numIndex]);
    temp[numIndex]=answer.targetNumber;

    target.turn=="AI"?target.pointsAI+=answer.maxDivider:target.pointsPlayer+=answer.maxDivider;//add points to child

    
    let isInvalid=true;
    for(let i=0;i<temp.length;i++)
    {
        if(temp[i]==1)
        {temp.splice(i,1);}
            
        if(temp[i]%2==0)
            {
                isInvalid = false;
            }
    }
    if(isInvalid&&target.str.length>gameRule.minStringSize)
    {
        //console.log("Invalid",temp);
        let breakPoint = randomIntFromInterval(1,temp.length-1);
        temp[0]+=temp[breakPoint];
        temp.splice(breakPoint,1);
        //console.log("To:",temp);
    }
    
    return temp;
}

class numString {
    constructor(str=generateString(),pointsAI=0,pointsPlayer=0,turn=gameRule.gameStart){
        this.str=str;
        this.pointsAI=pointsAI;
        this.pointsPlayer=pointsPlayer;
        this.turn=turn;
    }


    changeTurn(){
        (this.turn=="AI")?this.turn="Player":this.turn="AI";
        //console.log("Now is",this.turn);
    }

    /*
    createChild(numIndex){
        //console.log("Main state createChild", gameStatus.pointsAI,gameStatus.pointsPlayer,"At turn",gameStatus.turn);
        let temp = copyArray(this.str);
        let answer=this.processNumber(temp[numIndex]);
        temp[numIndex]=answer.targetNumber;

        //this.turn=="AI"?this.pointsAI+=answer.maxDivider:this.pointsPlayer+=answer.maxDivider;//add points to child

        
        let isInvalid=true;
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i]==1)
            {temp.splice(i,1);}
                
            if(temp[i]%2==0)
                {
                    isInvalid = false;
                }
        }
        if(isInvalid&&this.str.length>gameRule.minStringSize)
        {
            //console.log("Invalid",temp);
            let breakPoint = randomIntFromInterval(1,temp.length-1);
            temp[0]+=temp[breakPoint];
            temp.splice(breakPoint,1);
            //console.log("To:",temp);
        }
        
        return temp;
    }
    */
    gameOver()
    { 
        if(this.pointsAI>=this.pointsPlayer)
        {
            return "AI";
        }
        else return "Player"
    }

    checkEndState(bypass=false){
        
        let winner=null;
            if(this.str.length<=gameRule.minStringSize||bypass){
                
            this.pointsAI>this.pointsPlayer?winner="AI":winner="Player";
            if(winner==null){
                winner="No winner";
            }
        }
        return winner;
    }
    gameWinner(){
        
        if(this.pointsAI>this.pointsPlayer)
            return "AI";
        else return "Player";
    }

    possibleMoves()
    {
        
        let moves=[];
        for(let i=0;i<this.str.length;i++){
            if(this.str[i]%2==0)
            {
                moves.push(1);
            }
            else moves.push(0);
        }
        return moves;
    }
    
    processNumber(targetNumber)
    {
        targetNumber=parseInt(targetNumber);
        let maxDivider = Math.round(targetNumber/2);
        let answer = 
        {
            targetNumber:targetNumber,
            maxDivider:1,
            changed:false
        };
        if(targetNumber % 2 == 0)
        {
            answer.changed = true;
            if(targetNumber==2)
            {
                answer.targetNumber=1;
                
                return answer;
            }
            else
            {
                answer.targetNumber=targetNumber/maxDivider;
                answer.maxDivider=maxDivider;          
                return answer
            }
        
        }
        else return answer;
        }
}



buttonTrOne.addEventListener("click",checkString);
buttonDeleteTable.addEventListener("click", deleteTable);
buttonAI.addEventListener("click", clickedAI);
buttonPlayer.addEventListener("click", clickedPlayer);
buttonStart.addEventListener("click", clickedStart);
buttonReset.addEventListener("click", resetGameState);

function changeText (targetID, textString){
    document.getElementById(targetID).innerHTML = textString;
}

function generateTable(targetData)
{
    
    let cols = targetData.length;
    let rows =2;
    for(let i=0;i<rows;i++)
    {
        
        let row = document.createElement("tr");
        tableMain.appendChild(row);
        for (let j=0;j<cols;j++)
        {
            let cell = document.createElement("td");
            row.appendChild(cell);
            if(i==0){cell.innerHTML=j+1;}
            else
            {
                cell.innerHTML=gameStatus.str[j];
                cell.setAttribute("onclick","numberOnClick(this);");
                cell.setAttribute("name",j);
            }
        }
    }
}
function copyArray(arr){
    return JSON.parse(JSON.stringify(arr));
}


function deleteTable(){
    let target = tableMain;
    while(target.hasChildNodes())
    {
        target.removeChild(target.firstChild);
    }
}

function clickedAI(){
    gameRule.gameStart = "AI";
    console.log("First",gameRule.gameStart);
    buttonAI.setAttribute("class","buttonActive");
    buttonPlayer.setAttribute("class","buttonFaded");
    changeText("firstTurn","<strong>"+gameRule.gameStart+"</strong> will be first")
}

function clickedPlayer(){
    gameRule.gameStart = "Player";
    console.log("First",gameRule.gameStart);
    buttonAI.setAttribute("class","buttonFaded");
    buttonPlayer.setAttribute("class","buttonActive");
    changeText("firstTurn","<strong>"+gameRule.gameStart+"</strong> will be first")
}

function clickedStart(){
    gameRule.gameStarted = true;
    divSettings.hidden = true;
    gameStatus.turn = gameRule.gameStart;
    //console.log("First",gameStatus.turn);
    divGame.hidden=false;
    
    if(gameStatus.turn=="AI")
    {
        aiCallback();
    }
}

function checkString(target) {
    
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
    validateString(target,checkTarget);
}

function validateString(tString, targets){

    // Sum 1 numbers to next numbers
    // Then delete 1 from string
    
    if(tString.length>gameRule.minStringSize)
    {         
        let isInvalid = true;
        for(let i=0;i<tString.length;i++)
        {
            if(tString[i]%2==0)
                isInvalid = false;

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
        if(isInvalid&&tString.length>gameRule.minStringSize){
            console.log("Invalid at start",tString);
            let breakPoint = randomIntFromInterval(1,tString.length-1);
            tString[0]+=tString[breakPoint];
            tString.splice[breakPoint,1];
            console.log("Invalid",tString);
        }
       
    }
    else
    {
        gameEnd();
    }
    
}


function updatePoints(){
    
    textAIPoints.innerHTML="AI points: "+gameStatus.pointsAI;
    textPlayerPoints.innerHTML="Player points: "+gameStatus.pointsPlayer;
}


function numberOnClick(target)
{
    console.log("Main numberonclick start points", gameStatus.pointsAI,gameStatus.pointsPlayer,"At turn",gameStatus.turn);
    let targetNumber = target.innerHTML;
    let answerDict = gameStatus.processNumber(targetNumber);
    //console.log(gameStatus.turn,answerDict.changed,gameRule.gameStarted);
    if(gameStatus.turn=="Player"&&answerDict.changed==true&&gameRule.gameStarted==true)
    {
        console.log("Player got ",answerDict.maxDivider);
        gameStatus.pointsPlayer+= answerDict.maxDivider;
        updatePoints();
        gameStatus.str[target.getAttribute("name")]=answerDict.targetNumber;
        target.innerHTML = answerDict.targetNumber;
        if(answerDict.maxDivider==1)
        {   
            checkString(gameStatus.str);
            deleteTable();
            generateTable(gameStatus.str);
            
        }
        gameStatus.changeTurn();
        aiCallback();
    }

}
function aiCallback()
{
        if(gameStatus.turn=="AI"&&gameRule.gameStarted==true)
        {
            
            let aiMove = bestMove(gameStatus,gameRule.maxDepth);// 5

            let target= document.getElementsByName(aiMove);
            console.log(target, aiMove);
            target[0].setAttribute("class",'chosedByAI');
            console.log("AI choosed:", aiMove );
            const tempo=setTimeout(function(){aiProcess(aiMove)},gameRule.timeOut);
        }
    

}
function aiProcess(aiMove){
    //console.log("Main aiprocess start points", gameStatus.pointsAI,gameStatus.pointsPlayer,"At turn",gameStatus.turn);
    let answerDict=gameStatus.processNumber(gameStatus.str[aiMove]);
    gameStatus.str[aiMove]=answerDict.targetNumber;
    checkString(gameStatus.str);
    deleteTable();
    generateTable(gameStatus.str);
    gameStatus.pointsAI+= answerDict.maxDivider;
    updatePoints();
    gameStatus.changeTurn();
    if(gameStatus.str.length<=2)
    {
        gameEnd();
    }
}

function onstart()
{

    gameStatus= new numString();
    console.log("Start string:",gameStatus.str);
    checkString(gameStatus.str);
    generateTable(gameStatus.str);
    
}
onstart();
    