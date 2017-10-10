const getMap = require("./public/js/map.js");

module.exports = server => {
    const io = require("socket.io")(server);
    const games = [];

    io.on("connection", socket => {

        socket.emit("games", {games});

        socket.on("creategame", data => {
            const game = {
                name: data.name,
                players: 1,
                map: getMap(),
            }
            games.push(game);
            io.sockets.emit("enterlobby", {game});
            socket.broadcast.emit("games", {games});
        });

        socket.on("joingame", data => {
            const game = games.find(g => g.name === data.name);
            games.splice(games.indexOf(game), 1);
            game.players += 1;
            io.sockets.emit("enterlobby", {game});
        });

        socket.on("updates", data => socket.broadcast.emit("updates", data));

    });
}