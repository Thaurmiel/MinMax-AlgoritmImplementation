function bestMove(target){
    let bestScore =Number.NEGATIVE_INFINITY;
    let bestMove;
    let numberString = target.str;
    let moves = target.possibleMoves();


    for(let i=0;target.str.length;i++)
    {
        console.log("At minimax");
        if(moves[i]==1)
        {
            let temp = target.createChild[i];
            let score = minimax(temp);
            if(score> bestScore)
            {
                bestScore = score;
                bestMove = i;
            }
        }
        
    }
    return bestMove;
    
}


/*

function minimax(target, depth, isMax){
    if (depth==0||!("children" in node)){
        return node.value;
    }

    let target_value;
    let val;

    if(isMax){
        target_value = Number.NEGATIVE_INFINITY;

        for(let child in node.children)
        {
            val = minmax(node.children[child], depth-1, false);
            target_value = Math.min(val,target_value);
        }
        return target_value;
    }
    else
    {
        target_value = Number.POSITIVE_INFINITY;

        for(let child in node.children)
        {
            val = minmax(node.children[child], depth-1, true);
            target_value = Math.min(val,target_value);
        }
        return target_value;

    }

}
*/

function minimax(target)
{
        return 1;
}

