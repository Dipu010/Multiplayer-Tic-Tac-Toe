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
      <div className=" flex justify-center items-center text-3xl h-screen w-screen overflow-x-hidden overflow-y-hidden flex-col ">
        <div className=" h-[700px] w-[900px] relative flex justify-center items-center ">
          <Card className=" relative w-full  bg-card h-auto py-10">
            <div className=" pl-[840px] mt-[-20px] absolute ">
              <ModeToggle />
            </div>
            <CardHeader>
              <CardTitle className=" text-center text-5xl mb-10">
                Tic Tac Toe Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="name"
                className="w-1/2 mx-auto h-[50px] mb-5"
                placeholder="Enter your name"
              />
            </CardContent>

            <div className=" flex justify-center items-center gap-5">
              <Link href="/lobby"><Button className=" w-[180px] px-2 py-4 h-[60px] text-xl hover:bg-muted-foreground" >Create Room</Button></Link>
              <Link href='/join'><Button className="  w-[180px] px-2 py-4 h-[60px] text-xl hover:bg-muted-foreground">Join Room</Button></Link>
            </div>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Diptarshi;
