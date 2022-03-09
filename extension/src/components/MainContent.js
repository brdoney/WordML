/*global chrome*/
import "../assets/css/MainContent.css";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5000";

function Row(props) {
  const scorePercent = `${(props.score * 100).toFixed(2)}`;

  return (
    <tr>
      <td>{props.word}</td>
      <td>
        <progress value={props.score}></progress>
      </td>
      <td>{scorePercent}%</td>
    </tr>
  );
}

function Content() {
  const [data, setData] = useState({ entries: [] });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "get" }, (message) => {
      if (message.message === null) {
        fetch(`${API_URL}/board`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setData(res);
          });
      } else {
        // Post update then get data to update guesses
        fetch(`${API_URL}/board`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message.message),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setData(res);
          });
      }
    });
  }, []);

  const rows = [];
  for (const row of data["entries"]) {
    rows.push(<Row word={row["word"]} score={row["score"]} />);
  }

  return (
    <div className="content">
      <table id="wordTable">
        <thead>
          <tr>
            <th>Word</th>
            <th>Rating</th>
            <th>Score</th>
          </tr>
        </thead>
        {rows}
      </table>
    </div>
  );
}

export default Content;
