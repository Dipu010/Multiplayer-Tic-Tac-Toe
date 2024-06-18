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



const Diptarshi = () => {
  const [dipu, setDipu] = useState(0);

  return (
    <>
      <button className="">
        <ModeToggle/>
      </button>
      <div className=" flex justify-center items-center text-3xl h-screen w-screen overflow-x-hidden overflow-y-hidden ">
        <div className=" h-[700px] w-[900px] ">
        <Card className=" py-10">
          <CardHeader>
            <CardTitle className=" text-center text-5xl mb-10">Tic Tac Toe Game</CardTitle>
            
          </CardHeader>
          <CardContent>
            <Input type="name" className="w-1/2 mx-auto h-[50px] mb-5" placeholder="Enter your name"/>
            
          </CardContent>

          <Button>Enter</Button>
          <CardFooter>
           
          </CardFooter>
        </Card>

        </div>
      </div>
    </>
  );
};

export default Diptarshi;
