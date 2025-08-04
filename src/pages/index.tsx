import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleAsk = async () => {
    try {
      const res = await axios.post<{ response: string }>(
        "http://localhost:8000/query",
        {
          query: question,
        }
      );
      setAnswer(res.data.response);
    } catch (err: unknown) {
      setAnswer("Error: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">📚 RAG Q&A System</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full max-w-xl p-4 border rounded-lg mb-4 h-32"
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
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
