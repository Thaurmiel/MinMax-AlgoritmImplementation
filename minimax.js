function bestMove(target){
    let bestScore =Number.NEGATIVE_INFINITY;
    let move;
    let numberString = target.str;
    let moves = target.possibleMoves();
    //console.log(moves);


    for(let i=0;i<moves.length;i++)
    {

        //console.log("At minimax and i: ",i);
        if(moves[i]==1)
        {
            let temp = target.clone();
            temp.str = target.createChild(i);
            let score = minimax(temp, 0 ,true);
            if(score> bestScore)
            {
                bestScore = score;
                move = i;
            }
        }
        
    }
    return move;
    
}
function gameStartCheck()
{
    gameRule
}
let endStates={
    "AI":1,//as AI starts by default
    "Player":-1,
    "Same":0
}

function minimax(target, depth, isMax)
{
    let end = target.gameOver();
        return 1;
}

