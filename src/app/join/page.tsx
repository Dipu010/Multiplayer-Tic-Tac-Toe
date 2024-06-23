"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

export default function Join() {
  console.log("Join Page");
  const router = useRouter();
  const [roomIDJoin, setRoomIDJoin] = useState<string>("");
  const [socketID, setSocketID] = useState<string>("");

  useEffect(() => {
    if(socket.connected){
      console.log("SOCKET CONNECTED")
      setSocketID(socket.id?socket.id:"NHSG")
    }

    socket.on("JoinValidity",(value)=>{
      if(value)
          router.push('/game')
      else{
        console.log("Wrong Room iD")
        alert("Invalid Room ID")
      }  
    })

    function onConnect() {
      socket.io.engine.on("upgrade", (transport: any) => {
        
      });
    }
   
   socket.on("connect", () => {
      onConnect();
      console.log("User Connected ", socket.id);
      setSocketID(socket.id?socket.id:"NHSG")
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off("connect");
      socket.io.engine.off("upgrade");
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handlePlay = () => {
    socket.emit("Lobby", { socketId: socket.id, roomID: roomIDJoin, type: "Join" });
  };

  

  const handleBack = () => {
    socket.disconnect();
    router.push('/');
  };

  return (
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
            <p className="text-xl sm:text-2xl text-center">Socket ID: {socketID}</p>
            <Input
              type="text"
              className="w-full sm:w-1/2 mx-auto h-[50px] mb-5"
              placeholder="Enter your Room ID"
              onChange={(e) => { setRoomIDJoin(e.target.value); }}
              value={roomIDJoin}
            />
          </CardContent>
          <div className="flex  sm:flex-row justify-center items-center gap-5 px-10 ">
            <Button
              className="w-1/4  py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground px-10 "
              onClick={handlePlay}
            >
              Play
            </Button>
            <Button
              className="w-1/4  py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground px-10"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
