"use client";

import { useEffect, useState, useMemo } from "react";

import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");

  const [message, setMessage] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [displayMsg, setDisplayMsg] = useState<string>("");

  const socket = useMemo(() => io("http://localhost:3000"), []);
  console.log(typeof socket.id);
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

    function onDisconnect() {
      console.log("Disconnected");
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", () => {
      onConnect();
      console.log("User Connected ", socket.id);
    });

    socket.on("Received_Mesage", (message) => {
      setDisplayMsg(message);
    });

    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleID = () => {
    socket.emit("My_ID", socket.id);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("Message", { message, dest });

    setMessage("")
  };

  return (
    <div className=" flex justify-center items-center text-center flex-col">
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Socket ID: {socket?.id}</p>

      <div>Message: {displayMsg}</div>

      <Button onClick={handleID}>Click</Button>

      <div className=" gap-y-3  mt-5 gap-3 ">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Input
            type="text"
            placeholder="Type your message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <p>Seperator</p>
          <Input
            type="text"
            placeholder="Type whom to send"
            onChange={(e) => {
              setDest(e.target.value);
            }}
          />
          <Button className=" w-[100px]">Send</Button>
        </form>
      </div>
    </div>
  );
}
