document.write("<p>Hi from main.js</p>");
const divSettings = document.getElementById("divSettings");
const divGame = document.getElementById("divGame");
const divDebug = document.getElementById("divDebug");

const buttonAI = document.getElementById("buttonAI");
const buttonPlayer = document.getElementById("buttonPlayer");
const buttonStart = document.getElementById("gameStart");
const buttonTrOne = document.getElementById("bstateOne");
const buttonDeleteTable = document.getElementById("bdelTable");

const tableMain = document.getElementById("tableGame");

let textTurn = document.getElementById("firstTurn");
let textAIPoints = document.getElementById("aiPoints");
let textPlayerPoints = document.getElementById("playerPoints");
let textState1 = document.getElementById("stateOne");
let textState2 = document.getElementById("stateTwo");
let textState3 = document.getElementById("stateThree");
let textState4 = document.getElementById("stateFour");



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
    minStringSize : 3,
    stringSize :5,
    maxPoints:25,
    gameStarted : false
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
    }
    clone(){
        return new numString(this.str,this.pointsAI,this.pointsPlayer,this.turn);
    }
    createChild(numIndex){
        let moves = this.possibleMoves();
        let child=null;
        let temp = copyArray(this.str);
        temp[numIndex]=processNumber(temp[numIndex]);
        child.push(temp);
        return child;
    }

    gameOver()
    {
        if(this.pointsAI>gameRule.maxPoints)
        {
            return "AI";
        }
        if(this.pointsPlayer>gameRule.maxPoints)
        {
            return "Player";
        }
        if(this.str.length<3)
        {
            return "END";
        }
        
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
            textState2.innerHTML= answer.maxDivider +" "+answer.targetNumber;
            return answer;
            }
            else
            {
            answer.targetNumber=targetNumber/maxDivider;
            answer.maxDivider=maxDivider;
            textState2.innerHTML= answer.maxDivider +" "+answer.targetNumber;
            return answer
            }
        
        }
        else return answer;
        }
}

let gameStatus= new numString();

buttonTrOne.addEventListener("click",checkString);
buttonDeleteTable.addEventListener("click", deleteTable);
buttonAI.addEventListener("click", clickedAI);
buttonPlayer.addEventListener("click", clickedPlayer);
buttonStart.addEventListener("click", clickedStart);


function changeText (targetID, textString){
    document.getElementById(targetID).innerHTML = textString;
}

function generateTable(targetData)
{
    let cols = targetData.length;
    let rows =2;
    checkString(gameStatus.str);
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
                cell.innerHTML=gameStatus.str[j];
                cell.setAttribute("onclick","numberOnClick(this);");
                cell.setAttribute("place",j);
            }
        }
    }
}
function copyArray(arr){
    return JSON.parse(JSON.stringify(arr));
}

/*
function generatePath(target){// generate all childs of parent
    let childs = [];

    console.log("gen start, Target: "+ target+" Target length: "+ target.length);
    let changedTarget = copyArray(target);
    let answerDict = null;
    let place = 0;
    for(let i=0;i<target.length;i++)
    {
        answerDict= processNumber(target[i]);
        //console.log("Dictionary: string changed: "+ answerDict.changed+" at i= "+i);
        if(answerDict.changed == true)
        {
            changedTarget[i]=answerDict.targetNumber;
            //console.log("Change at place "+i+" to: "+ changedTarget[i]);
            checkString(changedTarget);
            childs.push(copyArray(changedTarget));
            changedTarget=copyArray(target);
            answerDict.changed == false;
        }
    }
    console.log("gen.end");
    return childs;
}

function addChilds(target){
    let childs = generatePath(target.value);
    //console.log(childs);
    for(let child in childs)
    {
        //console.log(childs[child],"on addChilds");
        let node=new TreeNode(childs[child]);
        target.childs.push(node);
    }

}

function generateTree(target){// generate tree
    //[10,10,10,11,11]
    const root = new TreeNode(target);
    let childs = null;
    let currentTarget = root;
    console.log("valLength", currentTarget.valLength);
    console.log("minStringSize", gameStatus.minStringSize);
    addChilds(currentTarget);
    for(let i=0;i<root.value.length;i++)
    {   

    for(let child in root.childs)
        {
            console.log(root.childs[child], "Onroot");
        }
        
        while(currentTarget.length>gameStatus.minStringSize)
        {
            console.log('Now at generate Tree');

            for(let child in currentTarget.childs)
            {
                console.log("Now in for child loop",child);
                addChilds(currentTarget);
                currentTarget=currentTarget.child;
            }
          console.log('before assignment', currentTarget.child)
        }
    }
    return root;

}
*/

function deleteTable(){
    let target = tableMain;
    while(target.hasChildNodes())
    {
        target.removeChild(target.firstChild);
    }
}

function clickedAI(){
    gameRule.gameStart = "AI";
    
    buttonAI.setAttribute("class","buttonActive");
    buttonPlayer.setAttribute("class","buttonFaded");
    changeText("firstTurn","<strong>"+gameRule.gameStart+"</strong> will be first")
}

function clickedPlayer(){
    gameRule.gameStart = "Player";
    buttonAI.setAttribute("class","buttonFaded");
    buttonPlayer.setAttribute("class","buttonActive");
    changeText("firstTurn","<strong>"+gameRule.gameStart+"</strong> will be first")
}

function clickedStart(){
    gameRule.gameStarted = true;
    divSettings.hidden = true;
    gameStatus.turn = gameRule.gameStart;
}

function processNumber(targetNumber)
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
    textState1.innerHTML = checkTarget;
    validateString(target,checkTarget);
}

function validateString(tString, targets){
    isInvalid = true;
    for(let i=0;i<tString.length;i++)
    {
        if(tString[i]%2==0)
        {
            isInvalid = false;
        }

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
    if(isInvalid){
        let breakPoint = randomIntFromInterval(1,tString.length-2);
        tString[0]+=tString[breakPoint];
        tString.splice[breakPoint,2];
    }
    
}



function numberOnClick(target)
{
    let targetNumber = target.innerHTML;
 
    textState3.innerHTML = targetNumber;

    if(gameStatus.turn=="Player")
    {
    let answerDict = processNumber(targetNumber);
    //target.setAttribute("style","color:red;");
    gameStatus.str[target.getAttribute("place")]=answerDict.targetNumber;
    textState4.innerHTML = gameStatus.str;
    target.innerHTML = answerDict.targetNumber;
    if(answerDict.maxDivider==1)
    {   
        checkString(gameStatus.str);
        deleteTable();
        generateTable(gameStatus.str);
    }
    gameStatus.changeTurn();
    }

}
function aiProcess(){
    let aiMove = bestMove(gameStatus);
    let answerDict=gameStatus.processNumber(gameStatus.str[aiMove]);
    checkString(gameStatus.str);
    deleteTable();
    generateTable(gameStatus.str);
    console.log("AI choosed ",aiMove );
    gameStatus.changeTurn();
}

function onstart()
{
    generateTable(gameStatus.str);
}
onstart();
    