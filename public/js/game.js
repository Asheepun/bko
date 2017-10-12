import generateWorld from "/js/world.js";
import getKeys from "/js/keys.js";
import getPointer from "/js/pointer.js";
import { v } from "/js/vector.js";
import { makeDrawAll, makeUpdateAll } from "/js/arrays.js";
import { handleRecievedUpdates, sendSocketUpdates } from "/js/handleSocket.js";
import { loadSprites, loadAudio } from "/js/loadAssets.js";
import getGuns from "/js/guns.js";
import drawHud from "/js/hud.js";

const start = ({ name, playerNum, players, socket, c, ctx, map, scale}) => {
    
    const offset = v(0, 0);
    const GAME = {
        name,
        id: playerNum,
        width: c.width*2,
        height: c.height*2,
        deltaTime: 0,
        lastTime: 0,
        offset,
        scale,
        pointer: getPointer(c, offset),
        keys: getKeys(document),
        player: null,
        guns: getGuns(),
        gun: getGuns()[0],
        enemies: [],
        obstacles: [],
        bushes: [],
        bullets: [],
        sentBullets: [],
        particles: [],
        explosions: [],
        crates: [],
        sprites: loadSprites(
            "obstacle",//0
            "player",//1
            "bullet",//2
            "bush",//3
            "tnt",//4
            "explosion",//5
            "blood",//6
            "crate",//7
            "background",//8
            "flash",//9
        ),
        audio: loadAudio(
            "shoot",//0
            "hit",//1
            "explosion",//2
            "crate",//3
            "bigshoot",//4
        ),
        defeat: false,
        endGame: false,
    };

    const drawAll = makeDrawAll(ctx);
    const updateAll = makeUpdateAll(GAME);

    generateWorld(map, GAME, GAME.sprites);

    const loop = (time) => {
        GAME.deltaTime = time - GAME.lastTime;
        GAME.lastTime = time;
        //updateLogic
        updateAll(
            GAME.gun,
            GAME.bullets,
            GAME.explosions,
            GAME.obstacles,
            GAME.player,
            GAME.particles,
            GAME.crates,
        );

        //checkDefeat
        if(GAME.player.health <= 0){
            GAME.defeat = true;
            GAME.endGame = true;
            setTimeout(() => location.reload(), 3000);
        }

        sendSocketUpdates(GAME, socket);

        //updateOffset
        GAME.offset.x = -GAME.player.center.x + c.width/2;
        GAME.offset.y = -GAME.player.center.y + c.height/2;
        if(GAME.offset.x > 0) GAME.offset.x = 0;
        if(GAME.offset.x < -GAME.width + c.width) GAME.offset.x = -GAME.width + c.width;
        if(GAME.offset.y > 0) GAME.offset.y = 0;
        if(GAME.offset.y < -GAME.height + c.height) GAME.offset.y = -GAME.height + c.height;


        //draw
        ctx.save();
        ctx.translate(GAME.offset.x, GAME.offset.y);
        //background
        for(let i = 0; i < GAME.height/40; i++){
            for(let j = 0; j < GAME.width/40; j++){
                ctx.drawImage(
                    GAME.sprites[8],
                    j*40, i*40, 40, 40
                );
            }
        }
        //entities
        drawAll(
            GAME.particles,
            GAME.crates,
            GAME.bullets,
            GAME.obstacles,
            GAME.enemies,
            GAME.player,
            GAME.bushes,
            GAME.explosions,
        );
        ctx.restore();
        drawHud(GAME, ctx);

        if(GAME.endGame){
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            if(GAME.defeat) ctx.fillText("Defeat", 350, 100);
            else ctx.fillText("Victory", 365, 100);
        }

        requestAnimationFrame(loop);

    }

    socket.on("updates", data => handleRecievedUpdates(GAME, data));

    loop(0);

}

export default start;