import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Message, messagesProps } from "@/types";

const MessageBox: React.FC<messagesProps> = ({ messages, setMessages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <React.Fragment>
      <div className="py-5 pl-5 pr-2 w-2/3 h-[70vh] border rounded-lg border-slate-600 glass ">
      {/* shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] */}
        <div className="overflow-y-auto h-full custom-scrollbar pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${msg.party === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`whitespace-pre-wrap ${msg.party === "user"
                  ? msg.text.startsWith("Error: ")
                    ? "text-red-400 bg-slate-800"
                    : "text-blue-300 bg-slate-800"
                  : msg.text.startsWith("Error: ")
                    ? "text-red-400 bg-slate-700"
                    : "text-green-300 bg-slate-700"
                  } px-4 py-2 rounded-lg max-w-[70%]`}
              >
                {/* <span className="font-semibold">{msg.party}:</span> {msg.text} */}
                <span className="font-semibold">{msg.party}:</span>{" "}

                {msg.party === "Paperman" && msg.text === "" ? (
                  <div className="inline-flex gap-1 ml-2">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                ) : (
                  msg.text
                )}
              </motion.div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessageBox;
