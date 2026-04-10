"use client";
import MessageBox from "@/app/components/MessageBox";
import QueryArea from "@/app/components/QueryArea";
import React, { useState } from "react";
import { Message } from "@/types";
import Dither from "./Dither";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-800">
      <div className="absolute inset-0 z-0">

      <Dither
        waveColor={[0.4,0.6,0.4]}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.02}
        />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5">

      <MessageBox messages={messages} setMessages={setMessages} />
      <QueryArea messages={messages} setMessages={setMessages} />
        </div>
    </div>
  );
};

export default Chat;
