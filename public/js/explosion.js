import object from "/js/object.js";
import {v, sub, half, div, add, mul, abs} from "/js/vector.js";
import { checkProx } from "/js/colission.js";

const explosion = ({ pos, img }) => {
    const explosion = object({
        pos,
        img,
    });
    //fixWeirdDrawingBug
    explosion.draw = (ctx) => {
        ctx.save();
        ctx.translate(explosion.center.x, explosion.center.y);
        ctx.drawImage(explosion.img,
            -explosion.size.x/2, -explosion.size.y/2, explosion.size.x, explosion.size.y
        );
        ctx.restore();
    }

    explosion.update = ({ lastTime, explosions, player, obstacles }) => {
        if(explosion.size.x > 160) explosions.splice(explosions.indexOf(explosion), 1);

        explosion.pos = sub(explosion.pos, v(7, 7));
        explosion.size = add(explosion.size, v(14, 14));
        explosion.center = add(explosion.pos, half(explosion.size));

        //colission
        for(let i = 0; i < obstacles.length; i++){
            if(abs(sub(obstacles[i].center, explosion.center)).mag < 20 + explosion.size.x/2)
                obstacles[i].hit = true;
        }

        const playerCol = checkProx(explosion.center, [player.center], 20 + explosion.size.x/2);
        if(playerCol){
            player.hit = true;
            player.damage = 0.5;
        }
        
    }
    return explosion;
}

export default explosion;