import bullet from "/js/bullet.js";
import { mul, div, half, add, sub } from "/js/vector.js";

export const sendSocketUpdates = ({ name, player, sentBullets, defeat, scale}, socket) => {
    let data = {
        name,
        player,
        bullets: sentBullets,
        defeat,
        scale,
    };

    socket.emit("updates", data);

    sentBullets.splice(0, sentBullets.length);
}

export const handleRecievedUpdates = (GAME, data) => {
    if(data.name === GAME.name){

        //handleCharacters
        GAME.enemies.forEach(e => {
            if(e.id === data.player.id){ 
                e.pos = mul(div(data.player.pos, data.scale), GAME.scale);
                e.center = add(e.pos, half(e.size));
                e.rotation = data.player.rotation;
            }
        });
        //handleBullets
        data.bullets.forEach(b =>{
            const pos = mul(div(b.pos, data.scale), GAME.scale);
            const size = mul(div(b.size, data.scale), GAME.scale);
            const speed = mul(div(b.speed, data.scale), GAME.scale);
            const bul = bullet({
                pos,
                size,
                speed,
                penetration: b.penetration,
                damage: b.damage,
                img: GAME.sprites[2],
                id: b.id,
                scale: 1,
            });
            GAME.bullets.push(bul)
        });
        //checkVictory
        if(data.defeat){
            GAME.endGame = true;
            setTimeout(() => location.reload(), 3000);
        }

    }
} 