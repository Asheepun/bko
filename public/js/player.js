import { v, half, add, angle } from "/js/vector.js";
import { checkCol } from "/js/colission.js";
import object from "/js/object.js";

const player = ({ pos, id, img }) => {
    const player = object({
        pos,
        size: v(30, 30),
        img,
    });
    player.id = id;
    player.health = 10;
    player.hit = false;
    player.damage = 0;

    player.update = ({ keys, deltaTime, obstacles, pointer }) => {

        //checkHit
        if(player.hit){
            player.hit = false;
            player.health -= player.damage;
        }

        //checkKeys
        if(keys.a) player.speed.x = -0.2*deltaTime;
        if(keys.d) player.speed.x = 0.2*deltaTime;
        if(keys.w) player.speed.y = -0.2*deltaTime;
        if(keys.s) player.speed.y = 0.2*deltaTime;
        if(keys.a && keys.d || !keys.a && !keys.d) player.speed.x = 0;
        if(keys.w && keys.s || !keys.w && !keys.s) player.speed.y = 0;

        //handleColission and move
        player.pos.x += player.speed.x;

        const xCol = checkCol(player, obstacles);
        if(xCol && player.speed.x > 0) player.pos.x = xCol.pos.x - xCol.size.x + 10;
        if(xCol && player.speed.x < 0) player.pos.x = xCol.pos.x + xCol.size.x;

        player.pos.y += player.speed.y;

        const yCol = checkCol(player, obstacles);
        if(yCol && player.speed.y > 0) player.pos.y = yCol.pos.y - yCol.size.y + 10;
        if(yCol && player.speed.y < 0) player.pos.y = yCol.pos.y + yCol.size.y;

        player.center = add(player.pos, half(player.size));

        player.rotation = angle(player.center, pointer.pos);

    }
    return player;
}

export default player;