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


export default function Join() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");

  const [message, setMessage] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [displayMsg, setDisplayMsg] = useState<string>("");

  const [roomIDJoin,setroomIDJoin]=useState<string>("")

//   const socket = useMemo(() => io("http://localhost:3000"), []);
  //console.log(socket)

  useEffect(() => {
    
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }
   
   socket.on("connect", () => {
      onConnect();
      console.log("User Connected ", socket.id);
    });
    return () => {
      
      
    };
  }, []);

  // const handleID = () => {
  //   socket.emit("My_ID", socket.id);
  // };

  const handlePlay=()=>{
    socket.emit("Lobby", { socketId: socket.id, roomID:roomIDJoin });
    
  }
  const handleBack=()=>{
    socket.disconnect()
  }

  
  return (
    <>
     <div className="flex flex-col justify-center items-center text-xl min-h-screen min-w-screen overflow-x-hidden overflow-y-hidden p-4">
  <div className="relative flex flex-col justify-center items-center h-auto w-full max-w-[90%] sm:max-w-[700px] md:max-w-[900px] p-4">
    <Card className="relative w-full bg-card h-auto py-10">
      <div className="absolute top-0 right-[-14px] mr-4">
        <ModeToggle />
      </div>
      <CardHeader>
        <CardTitle className="text-center text-3xl sm:text-4xl mb-10">
          Tic Tac Toe Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl sm:text-2xl text-center">Socket ID: {socket.id}</p>
        <Input
          type="name"
          className="w-full sm:w-1/2 mx-auto h-[50px] mb-5"
          placeholder="Enter your name"
        />
        <Input
          type="id"
          className="w-full sm:w-1/2 mx-auto h-[50px] mb-5"
          placeholder="Enter your Room ID"
          onChange={(e) => { setroomIDJoin(e.target.value); }}
          value={roomIDJoin}
        />
      </CardContent>
      <div className="flex  sm:flex-row justify-center items-center gap-5 ">
        <Link href="/game">
          <Button
            className="w-full px-10 py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground "
            onClick={handlePlay}
          >
            Play
          </Button>
        </Link>
        <Link href="/diptarshi">
          <Button
            className="w-full  py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground px-10"
            onClick={handleBack}
          >
            Back
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
