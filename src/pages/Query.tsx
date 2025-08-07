import { useState } from "react";

export default function Query() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAsk = async () => {
    setAnswer("");
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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setAnswer((prev) => prev + chunk);
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
        className=" w-2/3 p-4 border rounded-lg mb-4 h-32 text-black"
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
        <div className="mt-6 w-2/3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-black">Answer:</h2>
          <pre className="text-black whitespace-pre-wrap">{answer}</pre>
        </div>
      )}
    </div>
  );
}
