import { sub, abs } from "/js/vector.js";

export const checkCol = (obj, objects) => {
    for(let i = 0; i < objects.length; i++){
        const ob = objects[i];
        if(obj.pos.x + obj.size.x > ob.pos.x
        && obj.pos.x < ob.pos.x + ob.size.x
        && obj.pos.y + obj.size.x > ob.pos.y
        && obj.pos.y < ob.pos.y + ob.size.y) return ob;
    }
    return false;
}

export const checkProx = (vec, vecs, length) => {
    for(let i = 0; i < vecs.length; i++){
        if(abs(sub(vec, vecs[i])).mag < length) return vecs[i];
    }
    return false;
}
