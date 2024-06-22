"use client";
import { useEffect, useState } from "react";
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

const Diptarshi = () => {
  const [dipu, setDipu] = useState(0);

  

  const handleCreateRoom=()=>{
      
  }


  return (
    <>
     <div className="flex flex-col justify-center items-center text-xl min-h-screen min-w-screen overflow-x-hidden overflow-y-hidden p-4">
  <div className="relative flex flex-col justify-center items-center h-auto w-full max-w-[90%] sm:max-w-[700px] md:max-w-[900px] p-4">
    <Card className="relative w-full bg-card h-auto py-10">
      <div className="absolute top-0 right-[-14px]  mr-4 ">
        <ModeToggle />
      </div>
      <CardHeader>
        <CardTitle className="text-center text-3xl sm:text-4xl md:text-5xl mb-10">
          Tic Tac Toe Game
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="name"
          className="w-full sm:w-3/4 mx-auto h-[40px] sm:h-[50px] mb-5"
          placeholder="Enter your name"
        />
      </CardContent>
      <div className="flex  sm:flex-row justify-center items-center gap-5 px-6">
        <Link href="/lobby" className="w-full sm:w-1/3">
          <Button className="w-full px-2 py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground">
            Create Room
          </Button>
        </Link>
        <Link href="/join" className="w-full sm:w-1/3">
          <Button className="w-full px-2 py-4 h-[50px] sm:h-[60px] text-lg sm:text-xl hover:bg-muted-foreground">
            Join Room
          </Button>
        </Link>
      </div>
      <CardFooter></CardFooter>
    </Card>
  </div>
</div>


    </>
  );
};

export default Diptarshi;
