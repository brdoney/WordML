/*global chrome*/
import "../assets/css/MainContent.css";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState({
    entries: [
      {
        score: 1.0,
        word: "tares",
      },
      {
        score: 0.9940471601858769,
        word: "lares",
      },
      {
        score: 0.9867535607370882,
        word: "rales",
      },
      {
        score: 0.98376684188455,
        word: "rates",
      },
      {
        score: 0.9804624629607341,
        word: "nares",
      },
    ],
  });

  const processChange = (message) => {
    console.log(message.greeting);
    setData(message.data);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(processChange);
    return () => chrome.runtime.onMessage.removeListener(processChange);
  }, []);

  const rows = [];
  for (const row of data["entries"]) {
    rows.push(<Row word={row["word"]} score={row["score"]} />);
  }

  return (
    <div class="content">
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
