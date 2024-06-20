"use client";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const IndexPage: React.FC = () => {
  const [board, setBoard] = useState<String[]>(Array(9).fill(null));
  // const [roomID,setroomID]=useState<string>("")
  const router=useRouter()
  const [type,setType]=useState<String>("Lobby")
  const [move,setMove]=useState<boolean>(true)

  useEffect(()=>{
    
    return()=>{
      socket.disconnect()
      router.push('/diptarshi')
    }
  },[socket])

  socket.on("ServerMove", ({newBoard,typeUser}) => {
    setBoard(newBoard);
    setType(typeUser)
    setMove(true)
  });

  socket.on("OpponentDisconnect",(value)=>{
    toast.error(`${value} got Disconnected`);
    
    socket.disconnect()
    router.push('/diptarshi')
  })

  const handleClick = (index: number) => {
    const newBoard = [...board];
    if(!newBoard[index] && type=="Lobby" && move ){
      newBoard[index]="X"
      setBoard(newBoard);
      socket.emit("UserMove", {newBoard,type});
      setMove(false)
    }
    else if(!newBoard[index] && type=="Join" && move ){
      newBoard[index]="0"
      setBoard(newBoard);
      socket.emit("UserMove", {newBoard,type});
      setMove(false)
    } 
    else if(!type){
      console.log("Problem in useState type")
    }// Toggle between null and 1 for demonstration
    
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      <div className="  ml-[700px] mb-[100px]  ">
        <ModeToggle />
      </div>
      <p className=" text-5xl text-center font-semibold mb-[50px]">
        {" "}
        Tic Tac Toe
      </p>

      <p className=" text-2xl text-center font-semibold mb-[50px]">
        Socket ID: {socket.id}
      </p>
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <button
            key={uuidv4()}
            onClick={() => handleClick(index)}
            className="flex items-center justify-center w-24 h-24 text-5xl font-bold text-background bg-foreground rounded hover:bg-muted-foreground"
          >
            {value !== null ? value : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
