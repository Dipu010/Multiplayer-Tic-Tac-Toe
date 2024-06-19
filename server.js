import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let arr=new Set()

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Connected ",socket.id)
    socket.emit("Hello",`Welcome to server ${socket.id}`)

    socket.on("My_ID",(value)=>{
     
      arr.add(value)
      console.log("Got from frontend ",value)
      console.log(arr)
    })

    socket.on("Message",({message,dest})=>{

        console.log(dest,"  ",message)
        socket.to(dest).emit("Received_Mesage",message)
        
    })
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