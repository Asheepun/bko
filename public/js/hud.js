import { v, sub, add, normalize, reverse, pipe, mul } from "/js/vector.js";
import { checkProx } from "/js/colission.js";

const drawHud = ({ player, gun, enemies, pointer, offset, scale }, ctx) => {
    
    //healthBar
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 200*scale, 20*scale);
    ctx.fillStyle = "#3382bd";
    ctx.fillRect(0, 0, player.health*20*scale, 20*scale);
    ctx.fillStyle = "white";
    ctx.font = 15*scale + "px Arial";
    ctx.fillText(player.health + "/10", 5*scale, 16*scale);

    //overheating
    ctx.fillStyle = "orange";
    if(gun.overheating >= 200) ctx.fillStyle = "red";
    ctx.fillRect(0, 20*scale, gun.overheating*scale, 20*scale);

    //laserAim
    if(gun.name === "sniper"){
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = scale;
        const vec = pipe(
            sub(player.center, pointer.pos),
            normalize,
            reverse,
        );
        for(let i = 0; i < 800*2*scale; i++){
            if(checkProx(add(mul(vec, i), player.center), enemies.map(e => e.center), 15*scale))
                 ctx.strokeStyle = "red";
        }
        ctx.beginPath();
        ctx.moveTo(player.center.x + offset.x, player.center.y + offset.y);
        ctx.lineTo(player.center.x + vec.x * 800*scale + offset.x, player.center.y + vec.y * 800*scale + offset.y);
        ctx.stroke();
    }

}

export default drawHud;