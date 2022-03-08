import "../assets/css/MainContent.css";
import { useState, useEffect } from "react";
import WordTable from "./WordTable";

const API_URL = "http://127.0.0.1:4999";

async function getData(message: object) {
  let requestInfo = {};
  if (message !== null) {
    requestInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    };
  }

  try {
    const res = await fetch(`${API_URL}/board`, requestInfo);
    return res.json();
  } catch {
    return null;
  }
}

export interface ScoredWord {
  word: string;
  score: number;
}
export interface BoardData {
  entries: [ScoredWord];
}
export default function Content() {
  const [data, setData] = useState<BoardData | null>(null);
  const [err, setErr] = useState(false);

  const loadData = () => {
    // Reset before the call - should display a spinner
    setErr(false);
    setData(null);

    // Get the latest data from the content parsing script
    chrome.runtime.sendMessage({ type: "get" }, async (message) => {
      const res = await getData(message.message);
      if (res !== null) {
        setData(res);
      } else {
        setErr(true);
      }
    });
  };
  useEffect(loadData, []);

  // Display the table only if there's data
  if (!err) {
    return (
      <div className="content content-table">
        <WordTable boardData={data} />
      </div>
    );
  } else {
    return (
      <div className="content">
        <p>Could not connect to API</p>
        <button onClick={loadData}>Retry</button>
      </div>
    );
  }
}
