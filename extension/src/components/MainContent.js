/*global chrome*/
import "../assets/css/MainContent.css";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:4999";

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

  const processChange = (message) => {
    console.log(message.message);

    // Post update then get data to update guesses
    fetch(`${API_URL}/board/${id}`, {
      method: "POST",
      body: JSON.stringify(message.message),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  };

  const [id, setId] = useState(NaN);
  useEffect(() => {
    async function func() {
      // Get id for later
      const id = await fetch(`${API_URL}/id`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return res["id"];
        });
      setId(id);

      // Get the initial words
      const entries = await fetch(`${API_URL}/board/${id}`).then((res) => {
        return res.json();
      });
      setData(entries);
    }
    func();

    chrome.runtime.onMessage.addListener(processChange);
    return () => chrome.runtime.onMessage.removeListener(processChange);
  });

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
