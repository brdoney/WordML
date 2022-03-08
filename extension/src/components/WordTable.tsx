import { BoardData } from "./MainContent";
import { TailSpin } from "react-loader-spinner";

type RowProps = {
  score: number;
  word: string;
};
function Row({ score, word }: RowProps) {
  const scorePercent = `${(score * 100).toFixed(2)}`;

  return (
    <tr>
      <td>{word}</td>
      <td>
        <progress value={score}></progress>
      </td>
      <td>{scorePercent}%</td>
    </tr>
  );
}

type WordTableProps = {
  boardData: BoardData | null;
};
export default function WordTable(props: WordTableProps) {
  const data = props.boardData;

  // Show a spinner until we have data
  if (data != null) {
    const rows = [];
    for (const row of data.entries) {
      rows.push(<Row word={row["word"]} score={row["score"]} />);
    }
    return (
      <table id="wordTable">
        <thead>
          <tr>
            <th>Word</th>
            <th>Rating</th>
            <th>Strength</th>
          </tr>
        </thead>
        {rows}
      </table>
    );
  } else {
    return (
      <div className="spinner">
        <TailSpin color="blue" />
      </div>
    );
  }
}
