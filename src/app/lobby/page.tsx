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
      let roomIDGen= generateRoomID()
      
      socket.emit("Lobby", { socketId: socket.id, roomID:roomIDGen });
      setroomID(roomIDGen)
      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function generateRoomID(): string {
      let roomId = '';
      for (let i = 0; i < 10; i++) {
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
              
              <div className=" text-3xl text-center"> Socket ID: {socket.id}</div>
              <p className=" text-3xl text-center">Room ID: {roomID}</p>
              
            </CardContent>

            <div className=" flex  justify-center items-center gap-5">
            <p className=" text-4xl text-center mt-2">Waiting for other player</p>
            <DotsAnimation/>
            </div>
            <div className="flex  justify-center items-center gap-5">
            <Link href="/diptarshi"><Button className=" w-[180px] px-2 py-4 h-[60px] text-xl hover:bg-muted-foreground mt-10" onClick={()=>{socket.disconnect()}} >Leave Room</Button></Link>
            </div>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
