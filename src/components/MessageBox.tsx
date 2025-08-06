import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Message, messagesProps } from "@/types";

const MessageBox: React.FC<messagesProps> = ({ messages, setMessages }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   useEffect(() => {
  //     // Example: Load initial messages (could be from API or static)
  //     const initialMessages: Message[] = [
  //       { party: "user", text: "Hello!" },
  //       { party: "bot", text: "Hi, how can I help you?" },
  //       { party: "user", text: "Can you tell me about the weather today?" },
  //       {
  //         party: "bot",
  //         text: "Sure! The weather today is sunny with a high of 25°C.",
  //       },
  //       { party: "user", text: "That's great. What about tomorrow?" },
  //       {
  //         party: "bot",
  //         text: "Tomorrow is expected to be partly cloudy with a chance of rain in the evening.",
  //       },
  //       { party: "user", text: "Thanks! Can you also recommend a good book?" },
  //       {
  //         party: "bot",
  //         text: "Of course! I recommend 'Atomic Habits' by James Clear.",
  //       },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //       { party: "user", text: "Awesome, I'll check it out." },
  //       { party: "bot", text: "Let me know if you need more recommendations!" },
  //     ];
  //     setMessages(initialMessages);
  //   }, []);

  return (
    <React.Fragment>
      <div className="py-5 pl-5 pr-2 w-2/3 h-[70vh] border rounded-lg border-slate-600 bg-slate-900 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
        <div className="overflow-y-auto h-full custom-scrollbar pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${
                msg.party === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  msg.party === "user"
                    ? "text-blue-300 bg-slate-800"
                    : "text-green-300 bg-slate-700"
                } px-4 py-2 rounded-lg max-w-[70%]`}
              >
                <span className="font-semibold">{msg.party}:</span> {msg.text}
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
