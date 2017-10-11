const express = require("express");
const socketController = require("./socketController.js");
const app = express();

const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () => console.log("Listening on port: " + port));

socketController(server);