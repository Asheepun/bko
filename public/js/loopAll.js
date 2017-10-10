export const makeUpdateAll = (object) => (...arrs) => {
    for(let i = 0; i < arrs.length; i++){
        for(let i = 0; i < arrs[i]; i++){
            arrs[i][j].update(object);
        }
    }
}