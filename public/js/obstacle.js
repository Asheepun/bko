import object from "/js/object.js";
import explosion from "/js/explosion.js";
import particle from "/js/particle.js";
import { v, sub, pipe, add, mul, div } from "/js/vector.js";

export const obstacle = ({ pos, img }) => {
    const obstacle = object({ 
        pos, 
        img,
    });
    obstacle.health = 2;
    obstacle.hit = false;
    obstacle.lastHit = 0;

    obstacle.update = (GAME) => {
        if(obstacle.lastHit + 50 < GAME.lastTime) obstacle.alpha = 1;
        if(obstacle.hit){
            obstacle.health--;
            obstacle.hit = false;
            obstacle.imgPos.x = 40;
            obstacle.alpha = 0.8;
            obstacle.lastHit = GAME.lastTime;
        }
        if(obstacle.health <= 0) obstacle.remove(GAME);
    }
    obstacle.remove = ({ obstacles, particles }) => {
        //particleEffect
        for(let i = 0; i < 5; i++){
            particles.push(particle({
                pos: obstacle.center,
                size: v(10, 10),
                speed: v(Math.random()*4-2, Math.random()*4-2),
                time: 150,
                img: obstacle.img,
            }));
        }
        obstacles.splice(obstacles.indexOf(obstacle), 1);
    }

    return obstacle;
}

export const tnt = ({ pos, img }) => {
    const tnt = obstacle({ pos, img });

    tnt.remove = ({ explosions, sprites, obstacles }) => {
        explosions.push(explosion({
            pos,
            img: sprites[5],
        }));
        obstacles.splice(obstacles.indexOf(tnt), 1);
    }
    
    return tnt;
}