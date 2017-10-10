import getPointer from "/js/pointer.js";
import button from "/js/button.js";
import { v } from "/js/vector.js";
import start from "/js/game.js";
import { loadSprites } from "/js/loadAssets.js";

let c, ctx, btn;

const GAME = {};

window.onload = () => {
    GAME.c = document.getElementById("canvas");
    GAME.ctx = GAME.c.getContext("2d");
    GAME.c.width = 800;
    GAME.c.height = 600;
    GAME.socket = io();
    GAME.pointer = getPointer(GAME.c);
    GAME.state = lobby;
    GAME.buttons = [];
    GAME.games = [];
    GAME.gameButtons = [];
    GAME.players = 0;
    GAME.playerNum = null;
    GAME.map = null;
    GAME.name = null;
    GAME.started = false;
    GAME.sprites = loadSprites(
        "background",//0
    );

    //makeLobby
    GAME.buttons.push(button({pos: v(450, 50), text: "create game", fontSize: 17.5, action: createGame}));
    GAME.createName = "";
    GAME.type = e => {
        if(e.key === "Backspace"){ 
            GAME.createName = GAME.createName.slice(0, GAME.createName.length-1);
            return;
        }
        if(e.key === "Enter"){
            createGame();
            return;
        }
        if(e.key === "Shift"
        || e.key === "Control"
        || e.key === "Alt"
        || e.key === "AltGraph"
        || e.keyCode === 37
        || e.keyCode === 38
        || e.keyCode === 39
        || e.keyCode === 40
        || GAME.createName.length >= 10) return;
        GAME.createName += e.key;
    }
    document.addEventListener("keydown", GAME.type);
    //setupSocket
    GAME.socket.on("games", data => {
        GAME.games.splice(0, GAME.games.length);
        GAME.gameButtons.splice(0, GAME.gameButtons.length);
        data.games.forEach(game => GAME.games.push({
            name: game.name,
            player: game.players,
        }));
        GAME.games.forEach((game, i) => {
            GAME.gameButtons.push(button({
                text: game.name,
                fontSize: 20,
                pos: v(300, 100 + i*60),
                size: v(200, 50),
                action: () => joinGame(game.name),
            }));
        });
    });
    GAME.socket.on("enterlobby", data => {
        if(GAME.name === data.game.name){
            GAME.map = data.game.map;
            GAME.players = data.game.players,
            GAME.state = waitingForPlayersLobby;
        }
    });

    loop();
}

const waitingForPlayersLobby = () => {
    if(GAME.players >= 2) {
        GAME.started = true;
        document.removeEventListener("keydown", GAME.type);
        start(GAME);
    }
    //draw
    //background
    for(let i = 0; i < GAME.c.height/40; i++){
        for(let j = 0; j < GAME.c.width/40; j++){
            GAME.ctx.drawImage(
                GAME.sprites[0],
                j*40, i*40, 40, 40
            );
        }
    }
    GAME.ctx.fillStyle = "white";
    GAME.ctx.fillRect(260, 0, 300, 150);
    GAME.ctx.fillStyle = "black";
    GAME.ctx.font = "40px Arial";
    GAME.ctx.fillText(GAME.name, 400-GAME.name.length*10, 50);
    GAME.ctx.font = "25px Arial";
    GAME.ctx.fillText("Waiting for players: " + GAME.players + "/2", 280, 100);
}

const lobby = () => {

    GAME.buttons.forEach(b => b.update(GAME));
    GAME.gameButtons.forEach(b => b.update(GAME));

    //draw
    //background
    for(let i = 0; i < GAME.c.height/40; i++){
        for(let j = 0; j < GAME.c.width/40; j++){
            GAME.ctx.drawImage(
                GAME.sprites[0],
                j*40, i*40, 40, 40
            );
        }
    }
    //buttonsAndTextBox
    GAME.buttons.forEach(b => b.draw(GAME.ctx));
    GAME.gameButtons.forEach(b => b.draw(GAME.ctx));
    //drawGameCreatorTextField
    GAME.ctx.fillStyle = "white";
    GAME.ctx.fillRect(240, 50, 200, 35);
    GAME.ctx.fillStyle = "black";
    GAME.ctx.font = "25px Arial";
    GAME.ctx.fillText(GAME.createName, 250, 80);
    if(GAME.createName.length <= 0){
        GAME.ctx.globalAlpha = 0.5;
        GAME.ctx.fillText("type name", 250, 75);
        GAME.ctx.globalAlpha = 1;
    }
}

const createGame = () => {
    if(GAME.createName.length <= 0) return;
    const data = {
        name: GAME.createName,
    }
    GAME.name = data.name;
    GAME.playerNum = 1,
    GAME.socket.emit("creategame", data);
}

const joinGame = (name) => {
    GAME.playerNum = 2,
    GAME.name = name;
    GAME.socket.emit("joingame", {name});
}

const loop = () => {
    if(GAME.started) return;
    GAME.state();
    requestAnimationFrame(loop);
}
