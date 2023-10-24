import {WebSocketServer} from "ws";
import http from "http";
import express from "express";
import SocketIO from "socket.io";
import {isBrowsersQueryValid} from "@babel/preset-env/lib/targets-parser";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_, res) => res.render("home"))
app.get("/*", (_, res) => res.redirect("/"))

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    console.log(socket);
    socket.on("enter_room", (msg, done) => {
        // 어떤 이벤트이든 여기에 넣을 수 있음. 메세지 이벤트만 넣을 수 있는 것이 아님.
        // 인자로 함수를 넣어주면, 클라이언트에서 함수를 실행시킬 수 있음.
        console.log(msg)
        setTimeout(() => {
            done();
        }, 10000)
    })
});


// const wss = new WebSocketServer({server});


function onSocketClose() {
    console.log("close session")
}

const sockets = [];


// wss.on("connection", (socket) => {
//     sockets.push(socket)
//     console.log("Connected to Browser")
//     socket.on("close", onSocketClose)
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);
//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`))
//                 break;
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//     })
// })

httpServer.listen(3000, handleListen)