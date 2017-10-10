import object from "/js/object.js";
import { obstacle, tnt } from "/js/obstacle.js";
import player from "/js/player.js";
import { v, add, half, sub } from "/js/vector.js";

export const scl = 40;

const generateWorld = (map, game, sprites) => {
    map.forEach((row, y) => strEach(row, (tile, x) => {
        const pos = v(x*scl, y*scl);
        if(tile === "#") game.obstacles.push(obstacle({pos, img: sprites[0]}));
        if(tile === "T") game.obstacles.push(tnt({pos, img: sprites[4]}));
        if(tile === "B") game.bushes.push(object({pos, img: sprites[3]}));
        if(tile === "1"){
            if(game.id === 1) game.player = player({pos, id: 1, img: sprites[1]});
            if(game.id === 2) game.enemies.push(player({pos, id: 1, img: sprites[1]}));
        }
        if(tile === "2"){
            if(game.id === 1) game.enemies.push(player({pos, id: 2, img: sprites[1]}));
            if(game.id === 2) game.player = player({pos, id: 2, img: sprites[1]});
        }
    }));
}

const strEach = (str, func) => {
    for(let i = 0; i < str.length; i++){
        func(str[i], i);
    }
}

export default generateWorld;