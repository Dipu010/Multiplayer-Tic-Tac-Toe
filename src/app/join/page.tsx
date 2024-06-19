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
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      
      
      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    
  

    
    

   
    socket.on("connect", () => {
      onConnect();
      console.log("User Connected ", socket.id);
    });

    socket.on("Received_Mesage", (message) => {
      setDisplayMsg(message);

      

    });


    return () => {
      
      
    };
  }, []);

  const handleID = () => {
    socket.emit("My_ID", socket.id);
  };

  const handlePlay=()=>{
    socket.emit("Lobby", { socketId: socket.id, roomID:roomIDJoin });
  }

  
  return (
    <>
      <>
      <div className=" flex justify-center items-center text-3xl h-screen w-screen overflow-x-hidden overflow-y-hidden flex-col ">
        <div className=" h-[700px] w-[900px] relative flex justify-center items-center ">
          <Card className=" relative w-full  bg-card h-auto py-10">
            <button className=" pl-[840px] mt-[-20px] absolute ">
              <ModeToggle />
            </button>
            <CardHeader>
              <CardTitle className=" text-center text-5xl mb-10">
                Tic Tac Toe Game
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl text-center">Socket ID: {socket.id}</p>
              <Input
                type="name"
                className="w-1/2 mx-auto h-[50px] mb-5"
                placeholder="Enter your name"
              />
              <Input
                type="id"
                className="w-1/2 mx-auto h-[50px] mb-5"
                placeholder="Enter your Room ID"
                onChange={(e)=>{setroomIDJoin(e.target.value)}}
                value={roomIDJoin}

              />
            </CardContent>

            <div className=" flex justify-center items-center gap-5">
              <Link href='/game'><Button className="  w-[180px] px-2 py-4 h-[60px] text-xl hover:bg-muted-foreground" onClick={handlePlay}>Play</Button></Link>
              <Link href='/diptarshi'><Button className="  w-[180px] px-2 py-4 h-[60px] text-xl hover:bg-muted-foreground"  >Back</Button></Link>
            </div>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
    </>
  );
}
