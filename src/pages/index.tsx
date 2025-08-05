import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsk = async () => {
    try {
      setLoading(true);
      console.log("question: ", question);
      const res = await fetch("http://localhost:8080/ask", {
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

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        // const chunk = decoder.decode(value, { stream: true });
        const messages = buffer.split("\n\n");
        for (let i = 0; i < messages.length - 1; i++) {
          const msg = messages[i].trim();
          if (msg.startsWith("data:")) {
            const content = msg.replace(/^data:\s*/, "");
            if (content === "[DONE]") return;

            // Append to answer like ChatGPT style
            setAnswer((prev) => prev + content);
          }
        }
        // setAnswer((prev) => prev + chunk);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("err", err);
        setAnswer("Error: " + err.message);
      } else {
        setAnswer("Error: " + String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">📚 RAG Q&A System</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full max-w-xl p-4 border rounded-lg mb-4 h-32 text-black"
        placeholder="Ask a question based on your docs..."
      />
      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading || question.trim() === ""}
      >
        {loading ? "Loading..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-6 w-full max-w-xl bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-black">Answer:</h2>
          <p className="text-black">{answer}</p>
        </div>
      )}
    </div>
  );
}
