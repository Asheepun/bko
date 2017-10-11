import { v, sub, add, normalize, reverse, pipe, mul } from "/js/vector.js";
import { checkProx } from "/js/colission.js";

const drawHud = ({ player, gun, enemies, pointer, offset }, ctx) => {
    
    //healthBar
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 200, 20);
    ctx.fillStyle = "#3382bd";
    ctx.fillRect(0, 0, player.health*20, 20);
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(player.health + "/10", 5, 16);

    //overheating
    ctx.fillStyle = "orange";
    if(gun.overheating >= 200) ctx.fillStyle = "red";
    ctx.fillRect(0, 20, gun.overheating, 20);

    //laserAim
    if(gun.name === "sniper"){
        ctx.strokeStyle = "yellow";
        const vec = pipe(
            sub(player.center, pointer.pos),
            normalize,
            reverse,
        );
        for(let i = 0; i < 800*2; i++){
            if(checkProx(add(mul(vec, i), player.center), enemies.map(e => e.center), 15))
                 ctx.strokeStyle = "red";
        }
        ctx.beginPath();
        ctx.moveTo(player.center.x + offset.x, player.center.y + offset.y);
        ctx.lineTo(player.center.x + vec.x * 800 + offset.x, player.center.y + vec.y * 800 + offset.y);
        ctx.stroke();
    }

}

export default drawHud;