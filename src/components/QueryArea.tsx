import Image from "next/image";
import React, { useState } from "react";
import { Message, messagesProps } from "@/types";

const QueryArea: React.FC<messagesProps> = ({ messages, setMessages }) => {
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsk = async () => {
    if (question.trim() === "") return;
    const newMessage: Message = {
      party: "user",
      text: question,
    };
    setMessages([...messages, newMessage]);
    setQuestion("");

    // From chat bot
    // Add empty bot message and keep its index
    const botIndex = messages.length + 1;
    setMessages((prev) => [...prev, { party: "bot", text: "" }]);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: question }),
      });
      if (!res.body) {
        throw new Error("No response body");
      }
      const reader: ReadableStreamDefaultReader<Uint8Array> =
        res.body.getReader();
      const decoder: TextDecoder = new TextDecoder("utf-8");

      let botResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[botIndex]) {
            updated[botIndex] = {
              ...updated[botIndex],
              text: botResponse,
            };
          }
          return updated;
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("Error: " + err.message);
      } else {
        console.log("Error: " + String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const asking = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };
  return (
    <React.Fragment>
      <div className="w-2/3 border rounded-[30px]">
        <textarea
          value={question}
          placeholder="Asks question based on you docs.."
          className="w-full h-[15vh] p-5 rounded-t-2xl focus:outline-none resize-none"
          onChange={asking}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // preventing newline
              handleAsk();
            }
          }}
        />
        <div className="flex flex-row-reverse p-3">
          <button
            className="rounded-full hover:shadow-[0px_0px_10px_rgba(128,128,128,0.5)]"
            onClick={handleAsk}
            disabled={loading || question.trim() === ""}
          >
            <Image
              src={"/icon_white_fixed.png"}
              alt="icon"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QueryArea;
