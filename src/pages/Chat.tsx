import MessageBox from "@/components/MessageBox";
import QueryArea from "@/components/QueryArea";
import React, { useState } from "react";
import { Message } from "@/types";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="bg-slate-800 h-[100vh] flex gap-5 flex-col items-center justify-center">
      <MessageBox messages={messages} setMessages={setMessages} />
      <QueryArea messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Chat;
