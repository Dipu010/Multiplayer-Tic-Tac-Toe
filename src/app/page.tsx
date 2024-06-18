import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" flex items-center justify-center">
          <h1>Tic Tac Toe Game</h1>
            <Card/>
      </div>
    </>
  );
}
