"use client";
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {socket} from "@/socket"
import { io } from "socket.io-client";
import DotsAnimation from "@/components/misc/DotsAnimation";
import { useRouter } from "next/navigation";


export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");

  const [message, setMessage] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [displayMsg, setDisplayMsg] = useState<string>("");

  const [roomID,setroomID]=useState<string>("635757234")

  const router=useRouter()

  
  //console.log(socket)

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

      function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      let roomIDGen=generateRoomID()
      
      socket.emit("Lobby", { socketId: socket.id, roomID:roomIDGen });
      setroomID(roomIDGen)
      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function generateRoomID(): string {
      let roomId = '';
      for (let i = 0; i < 5; i++) {
          const digit = Math.floor(Math.random() * 10); // Generate random digit between 0 and 9
          roomId += digit.toString(); // Append digit to roomId string
      }
      return roomId;
  }

  socket.on("UserJoinFromLobby",(value,Room)=>{
        if(value){
            console.log("Confirmation from server in lobby")
            
            router.push('/game')
            
        }
        console.log("Hello")
  })

    
    

   
    socket.on("connect", () => {
      onConnect();
      console.log("User Connected ", socket.id);
    });

    socket.on("Received_Mesage", (message) => {
      setDisplayMsg(message);

      

    });



    return () => {
      
      
    };
  }, [router]);

  const handleID = () => {
    socket.emit("My_ID", socket.id);
  };

  const handleRedirect = (value : boolean) => {
    
    
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-xl min-h-screen min-w-screen overflow-x-hidden overflow-y-hidden p-4">
  <div className="relative flex flex-col justify-center items-center h-auto w-full max-w-[90%] sm:max-w-[700px] md:max-w-[900px] p-4">
    <Card className="relative w-full bg-card h-auto py-10">
      <div className="absolute top-0 right-[-14px] mr-4">
        <ModeToggle />
      </div>
      <CardHeader>
        <CardTitle className="text-center text-3xl sm:text-4xl md:text-5xl mb-10">
          Tic Tac Toe Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl md:text-3xl text-center">Socket ID: {socket.id}</div>
        <p className="text-xl sm:text-2xl md:text-3xl text-center">Room ID: {roomID}</p>
      </CardContent>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-5">
        <p className="text-2xl sm:text-3xl text-center">Waiting for other player</p>
        <DotsAnimation />
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <Link href="/diptarshi">
          <Button
            className="w-full sm:w-auto px-2 py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground mt-5"
            onClick={() => { socket.disconnect(); }}
          >
            Leave Room
          </Button>
        </Link>
      </div>
      <CardFooter></CardFooter>
    </Card>
  </div>
</div>

    </>
  );
}
