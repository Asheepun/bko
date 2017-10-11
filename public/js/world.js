import object from "/js/object.js";
import { obstacle, tnt } from "/js/obstacle.js";
import player from "/js/player.js";
import { v, add, half, sub } from "/js/vector.js";
import { checkProx } from "/js/colission.js";

export const scl = 40;

const generateWorld = (map, game, sprites) => {
    map.forEach((row, y) => strEach(row, (tile, x) => {
        const pos = v(x*scl, y*scl);
        if(tile === "#") game.obstacles.push(obstacle({pos, img: sprites[0]}));
        if(tile === "T") game.obstacles.push(tnt({pos, img: sprites[4]}));
        if(tile === "B") game.bushes.push(object({pos, img: sprites[3]}));
        if(tile === "C") game.crates.push(crate({pos: add(pos, v(10, 10)), img: sprites[7]}));
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

const crate = ({ pos, img }) => {
    const crate = object({
        pos,
        img,
        size: v(20, 20),
    });

    crate.update = (GAME) => {
        const playerCol = checkProx(crate.center, [GAME.player.center], 40);
        if(playerCol){
            let newGun = GAME.guns[Math.floor(Math.random()*GAME.guns.length)];
            while(newGun.name === GAME.gun.name || newGun.name === "pistol"){
                newGun = GAME.guns[Math.floor(Math.random()*GAME.guns.length)];
            }
            console.log(newGun.name);
            GAME.gun = newGun;
            GAME.gun.overheating = 0;
            GAME.crates.splice(GAME.crates.indexOf(crate), 1);
            GAME.audio[3].load();
            GAME.audio[3].play();
        }
    }
    return crate;
}

const strEach = (str, func) => {
    for(let i = 0; i < str.length; i++){
        func(str[i], i);
    }
}

export default generateWorld;