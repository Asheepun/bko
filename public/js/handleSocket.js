import bullet from "/js/bullet.js";

export const sendSocketUpdates = ({ name, player, sentBullets, defeat, }, socket) => {
    let data = {
        name,
        player,
        bullets: sentBullets,
        defeat,
    };

    socket.emit("updates", data);

    sentBullets.splice(0, sentBullets.length);
}

export const handleRecievedUpdates = (GAME, data) => {
    if(data.name === GAME.name){

        //handleCharacters
        GAME.enemies.forEach(e => {
            if(e.id === data.player.id){ 
                e.pos = data.player.pos;
                e.center = data.player.center;
                e.rotation = data.player.rotation;
            }
        });
        //handleBullets
        data.bullets.forEach(b => GAME.bullets.push(bullet({
            pos: b.pos,
            size: b.size,
            speed: b.speed,
            penetration: b.penetration,
            damage: b.damage,
            img: GAME.sprites[2],
            id: b.id,
        })));
        //checkVictory
        if(data.defeat){
            GAME.endGame = true;
            setTimeout(() => location.reload(), 3000);
        }

    }
} 