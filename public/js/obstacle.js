import object from "/js/object.js";
import explosion from "/js/explosion.js";
import particle from "/js/particle.js";
import { v, sub, pipe, add, mul, div } from "/js/vector.js";

export const obstacle = ({ pos, img, scale }) => {
    const obstacle = object({ 
        pos, 
        img,
        scale,
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
    obstacle.remove = ({ obstacles, particles, scale }) => {
        //particleEffect
        for(let i = 0; i < 5; i++){
            const p = particle({
                pos: obstacle.center,
                size: v(10, 10),
                speed: v(Math.random()*4-2, Math.random()*4-2),
                time: 150,
                img: obstacle.img,
                scale,
            });
            p.pos = div(p.pos, scale)
            particles.push(p);
        }
        obstacles.splice(obstacles.indexOf(obstacle), 1);
    }

    return obstacle;
}

export const tnt = ({ pos, img, scale }) => {
    const tnt = obstacle({ 
        pos, 
        img, 
        scale 
    });

    tnt.remove = ({ explosions, sprites, obstacles, audio, scale }) => {
        audio[2].load();
        audio[2].play();
        explosions.push(explosion({
            pos,
            img: sprites[5],
            scale,
        }));
        obstacles.splice(obstacles.indexOf(tnt), 1);
    }
    
    return tnt;
}