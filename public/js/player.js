import { v, half, add, angle } from "/js/vector.js";
import { checkCol } from "/js/colission.js";
import object from "/js/object.js";

const player = ({ pos, id, img, scale }) => {
    const player = object({
        pos,
        size: v(30, 30),
        img,
        scale,
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
        if(keys.a) player.speed.x = -0.2*deltaTime*scale;
        if(keys.d) player.speed.x = 0.2*deltaTime*scale;
        if(keys.w) player.speed.y = -0.2*deltaTime*scale;
        if(keys.s) player.speed.y = 0.2*deltaTime*scale;
        if(keys.a && keys.d || !keys.a && !keys.d) player.speed.x = 0;
        if(keys.w && keys.s || !keys.w && !keys.s) player.speed.y = 0;

        //handleColission and move
        player.pos.x += player.speed.x;

        const xCol = checkCol(player, obstacles);
        if(xCol && player.speed.x > 0) player.pos.x = xCol.pos.x - xCol.size.x + xCol.size.x - player.size.x;
        if(xCol && player.speed.x < 0) player.pos.x = xCol.pos.x + xCol.size.x;

        player.pos.y += player.speed.y;

        const yCol = checkCol(player, obstacles);
        if(yCol && player.speed.y > 0) player.pos.y = yCol.pos.y - yCol.size.y + yCol.size.y - player.size.y;
        if(yCol && player.speed.y < 0) player.pos.y = yCol.pos.y + yCol.size.y;

        player.center = add(player.pos, half(player.size));

        player.rotation = angle(player.center, pointer.pos);

    }
    return player;
}

export default player;