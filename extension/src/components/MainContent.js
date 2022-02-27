/*global chrome*/
import "../assets/css/MainContent.css";
import { useEffect, useState, useRef } from "react";

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
  const [id, _setId] = useState(NaN);
  const idRef = useRef(id);
  const setId = (newId) => {
    idRef.current = newId;
    _setId(newId);
  };

  function processChange(message) {
    console.log(message.message);
    console.log(idRef.current);

		// Add id to request
		const update = message.message;
		update.id = idRef.current;

    // Post update then get data to update guesses
    fetch(`${API_URL}/board/${idRef.current}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }

  useEffect(() => {
    console.log("id has changed", id);
  }, [id]);

  useEffect(() => {
    async function func() {
      // Get id for later
      const _id = await fetch(`${API_URL}/id`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return res["id"];
        });
      setId(_id);

      // Get the initial words
      const entries = await fetch(`${API_URL}/board/${_id}`).then((res) => {
        return res.json();
      });
      setData(entries);
    }
    func();

    chrome.runtime.onMessage.addListener(processChange);
    return () => chrome.runtime.onMessage.removeListener(processChange);
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
