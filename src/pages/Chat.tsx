import MessageBox from "@/components/MessageBox";
import QueryArea from "@/components/QueryArea";
import React from "react";

const Chat = () => {
  return (
    <div className="bg-slate-800 h-[100vh] flex gap-5 flex-col items-center justify-center">
      <MessageBox />
      <QueryArea />
    </div>
  );
};

export default Chat;
