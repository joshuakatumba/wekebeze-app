import React from "react";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const nav = useNavigate();

  const chatCompletions = JSON.parse(localStorage.getItem("analytics") || "[]");
  const quizResults = JSON.parse(localStorage.getItem("quizAnalytics") || "[]");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <button
        onClick={() => nav("/home")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Chat Completions</h2>
        {chatCompletions.length === 0 ? (
          <p>No chat completions yet.</p>
        ) : (
          <ul className="space-y-2">
            {chatCompletions.map((item, index) => (
              <li key={index} className="p-4 border rounded">
                <p>
                  <strong>Cancer Type:</strong> {item.cancerType}
                </p>
                <p>
                  <strong>Language:</strong> {item.lang}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
        {quizResults.length === 0 ? (
          <p>No quiz results yet.</p>
        ) : (
          <ul className="space-y-2">
            {quizResults.map((item, index) => (
              <li key={index} className="p-4 border rounded">
                <p>
                  <strong>Cancer Type:</strong> {item.cancerType}
                </p>
                <p>
                  <strong>Score:</strong> {item.score} / {item.total}
                </p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
