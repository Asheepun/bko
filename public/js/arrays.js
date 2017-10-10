export const makeUpdateAll = (GAME) => (...arrs) => {
    for(let i = 0; i < arrs.length; i++){
        if(arrs[i].constructor === Array)
            for(let j = 0; j < arrs[i].length; j++){
                arrs[i][j].update(GAME);
            }
        else arrs[i].update(GAME);
    }
}
    
export const makeDrawAll = (ctx) => (...arrs) => {
    for(let i = 0; i < arrs.length; i++){
        if(arrs[i].constructor === Array)
            for(let j = 0; j < arrs[i].length; j++){
                arrs[i][j].draw(ctx);
            }
        else arrs[i].draw(ctx);
    }
}