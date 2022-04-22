function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function generateString(){
  let returnString =[];
  for(let i=0;i<10;i++)
  {
    returnString.push(randomIntFromInterval(10,20));
  }
  return returnString;
}

let str1 = generateString();

let target = str1;
let checkTarget = [];

target[0]=1;
target[2]=1;
target[9]=1;

console.log("target: "+ target);

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

console.log("Target shadow:"+checkTarget);

let target1 = checkTarget;


function validate(target11, target2)
{
    for(let i=0;i<target11.length;i++)
    {
        if(target2[i]==1)
        {
            if(i==target11.length-1){
                target11[i-1]+=target11[i];
                
            }
            else
            {
            target11[i+1]+=target11[i];
            
            }
            }
    }
    for(let i=0;i<target11.length;i++)
    {
        if(target11[i]==1)
        {
            target11.splice(i,1);
        }
    }
    console.log("Target "+target11);
}

class TreeNode {
    constructor(value)
    {
        this.value = value;
        this.descendants = [];
    }

}



/*
function generateTree(target){// generate tree
    //[10,10,10,11,11]
    const root = new TreeNode(target);
    console.log("generate tree step");
    let childs = null;
    let currentTarget = root;
    
    for(let i=0;i<root.value.length;i++)
    {
        
        while(currentTarget.valLength>gameStatus.minStringSize)
        {
            for(let child in currentTarget.childs)
            {
                addChilds(currentTarget);
            }
            console.log(currentTarget.child);
            currentTarget=currentTarget.child;
        }
        console.log("generate end");
    }
    return root;

}

*/
