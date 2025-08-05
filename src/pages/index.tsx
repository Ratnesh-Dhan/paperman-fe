import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleAsk = async () => {
    try {
      console.log("question", question);
      const res = await axios.post<{ answer: string }>(
        "http://localhost:8080/ask",
        {
          query: question,
        }
      );
      console.log("res", res.data.answer);
      setAnswer(res.data.answer);
    } catch (err) {
      if (err instanceof Error) {
        console.log("err", err);
        setAnswer("Error: " + err.message);
      } else {
        setAnswer("Error: " + String(err));
      }
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
      >
        Ask
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
