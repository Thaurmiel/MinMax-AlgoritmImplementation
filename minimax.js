let endStates=
{
    "AI":1,
    "No winner":0,
    "Player":-1
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
function bestMove(target,depth){
    //console.log("Depth",depth);
    let bestScore =-1000;
    let alpha = -100;
    let beta = 100;
    let movePlace =1;
    let moves = target.possibleMoves();
    //console.log(moves);

    for(let i=0;i<target.str.length;i++)
    {
        if(moves[i]==1)
        {
            let child = clone(target);//get string
            child.str = target.createChild(i);//make move
            console.log("Child points", child.pointsAI,child.pointsPlayer);
            
            score = minimax(child, depth , alpha, beta);  
            console.log("Child",child.str,"on place", i,"With score",score,"On turn",child.turn);
            if(score>bestScore)
            {
                console.log("Score changed to",score,"from",bestScore);
                bestScore=score;
                movePlace=i;
            }
            
        }
    }
    return movePlace;
    
}


function minimax(target, depth, alpha,beta, isMax=1)
{

    // if reached, return target child evaluation
    let end = target.checkEndState();
    if(end!=null)
    {
        let endState= endStates[end];
        console.log("Thats end at Depth:",depth,"EndState",endState);
        return endState;
    }
    if(depth==0)
    {
        //console.log("Bypass because of depth", depth);
        end= target.checkEndState(true);
        let endState= endStates[end];
        //console.log("Thats end at Depth:",depth,"EndState",endState);
        return endState;
    }
    // if not reached, find end or max depth
    
    if(isMax==1)
    {

        let bestScore =-1000;
        //for each avaiable spot in position
        let moves = target.possibleMoves();
        // 1 1 1 2 2 2
        // 0 0 0 1 1 1 
        for(let i=0;i<moves.length;i++)
        {            
            if(moves[i]==1)
            {
                //on avaiable turn create string child
                let child = clone(target);//get string
                child.str = target.createChild(i);//make move

                //console.log(target.str,"points:",target.pointsAI,target.pointsPlayer, "Depth:",depth, "IsMax?:", isMax,"atTurn:",target.turn);
                let score = minimax(child, depth-1,alpha,beta ,0);// next step
                bestScore=Math.max(bestScore,score);
                alpha  =Math.max(alpha,score);
                if(beta<=alpha)
                {
                    console.log("Cut on" , target.str, "at depth",depth);
                    break;
                }
            }
        }
        return bestScore;
    }
    else//if(!Max)
    {

        //console.log("onmin");
        let bestScore =1000;
        let moves = target.possibleMoves();
        for(let i=0;i<moves.length;i++)
        {
            if(moves[i]==1)
            {
                
            let temp = clone(target);//get string
            temp.str = target.createChild(i);//make move
            //console.log(target.str,"points:",target.pointsAI,target.pointsPlayer, "Depth:",depth, "IsMax?:", isMax,"atTurn:",target.turn);
            let score = minimax(temp, depth-1,alpha,beta ,1);// next step
            bestScore=Math.min(bestScore,score);
            beta  =Math.min(beta,score);
            if(beta<=alpha)
            {
                console.log("Cut on" , target.str, "at depth",depth);
                break;
            }
            }
        }
        return bestScore;
        
    }

}

