import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let map = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Connected ", socket.id);
    socket.emit("Hello", `Welcome to server ${socket.id}`);

    socket.on("Lobby", ({ socketId, roomID,type }) => {
      let room = io.sockets.adapter.rooms.get(roomID);
     
      let numClients = room ? room.size : 0;
      console.log("Got event from lobby ", socket.id, "  ", numClients);
      if (numClients < 1 && type=="Lobby") {
        map.set(socketId, roomID);
        socket.join(roomID);
        console.log(map);
      } else if (numClients == 1 && type=="Join") {
        socket.emit("JoinValidity",(true));
        console.log("2 people joined in the room");
        map.set(socketId, roomID);
        socket.join(roomID);
        console.log(map);

        console.log("Confirmation accepted");
        socket
          .to(roomID)
          .emit("UserJoinFromLobby", { value: true, Room: roomID });
      } else if (numClients > 1) {
        console.log("Limit Exceeded");
      }
      else if(numClients<1 && type=="Join"){
        socket.emit("JoinValidity",(false));
      }
    });

    socket.on("UserMove", ({newBoard,type,win}) => {
      if (map.has(socket.id)) {
        let Room_ID = map.get(socket.id);
        let typeUser=type=="Lobby"?"Join":"Lobby"
        socket.to(Room_ID).emit("ServerMove", {newBoard,typeUser,win});
      }
    });

    let validID=false
    socket.on("SearchRoomID",(roomIDJoin)=>{
      for (let val of map.values()) {
        if (val === roomIDJoin) {
            validID=true
        }
    }
        socket.to(socket).emit("CheckID",(validID))
    })

    let typeuser=""

    socket.on("InfoUser",({socketID,type})=>{
      typeuser=type
      socket.emit("TypeUser",(typeuser))
    })
    socket.emit("TypeUser",(typeuser))


    socket.on("disconnect", () => {
      console.log("Disconnected ", socket.id);
      if (map.has(socket.id)) {
        let RoomID = map.get(socket.id);

        map.delete(socket.id);
        console.log(`Entry with key '${socket.id}' deleted successfully.`);

        let OtherSocket = "";
        if (RoomID) {
          for (const [key, val] of map.entries()) {
            if (val === RoomID) {
              OtherSocket = key;
              io.to(OtherSocket).emit("OpponentDisconnect",socket.id)
            }
          }
        }
      } else {
        console.log(`Key '${socket.id}' not found in the Map.`);
      }

      console.log(map);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
