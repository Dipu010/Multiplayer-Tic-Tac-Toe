"use client";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";


const IndexPage: React.FC = () => {
  const [board, setBoard] = useState<String[]>(Array(9).fill(null));
  // const [roomID,setroomID]=useState<string>("")
  const router=useRouter()
  const [type,setType]=useState<String>("Lobby")
  const [move,setMove]=useState<boolean>(true)
  const [msg,setMsg]=useState<String>("")

  useEffect(()=>{
    
    return()=>{
      socket.disconnect()
      router.push('/diptarshi')
    }
  },[socket])


  socket.on("ServerMove", ({newBoard,typeUser,win}) => {
    setBoard(newBoard);
    console.log("server move ",win)
    //let result=calculateWinner(newBoard)
    //console.log(result)
    if(win){
      setMsg("Opponent wins")
    }
    setType(typeUser)
    setMove(true)
  });

  socket.on("OpponentDisconnect",(value)=>{
    
    socket.disconnect()
    router.push('/diptarshi')
  })

  const handleClick = (index: number) => {
    const newBoard = [...board];

    if(!newBoard[index] && type=="Lobby" && move ){
      console.log("X move")
      newBoard[index]="X"
      setBoard(newBoard);
      
      let result=calculateWinner(newBoard)
      if(result=="X"){
        setMsg("You win")
        socket.emit("UserMove", {newBoard,type,win:true});
      }
      else{
        socket.emit("UserMove", {newBoard,type,win:false});
      }
      
      setMove(false)
    }
    else if(!newBoard[index] && type=="Join" && move ){
      console.log("O move")
      newBoard[index]="0"
      setBoard(newBoard);
      let result=calculateWinner(newBoard)
      if(result=="0"){
        setMsg("You win")
        socket.emit("UserMove", {newBoard,type,win:true});
      }
      socket.emit("UserMove", {newBoard,type,win:false});
      setMove(false)
    } 
    else if(!type){
      console.log("Problem in useState type")
    }// Toggle between null and 1 for demonstration
    
    
  };
  
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  const calculateWinner = (board: any[]) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
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
      <p className=" text-2xl text-center font-semibold mb-[50px]">
        {msg}
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
