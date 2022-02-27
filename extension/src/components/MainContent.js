import '../assets/css/MainContent.css';

function content() {
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
          <tr>
            <td id="word1">Word1</td>
            <td>
            <progress id="determinate1" value="80" min="0"max ="100">
            </progress>
            </td>
            <td id="score1">Score1</td>
          </tr>
          <tr>
            <td id="word2">Word2</td>
            <td>
            <progress id="determinate2" value="65" min="0"max ="100">
            </progress>
            </td>
            <td id="score2">Score2</td>
          </tr>
          <tr>
            <td id="word3">Word3</td>
            <td>
            <progress id="determinate3" value="60" min="0"max ="100">
            </progress>
            </td>
            <td id="score3">Score3</td>
          </tr>
          <tr>
            <td id="word4">Word4</td>
            <td>
            <progress id="determinate4" value="50" min="0"max ="100">
            </progress>
            </td>
            <td id="score4">Score4</td>
          </tr>
          <tr>
            <td id="word5">Word5</td>
            <td>
            <progress id="determinate5" value="45" min="0"max ="100">
            </progress>
            </td>
            <td id="score5">Score5</td>
          </tr>
        </table>
      <p id="description"> Description? </p>
    </div>
  );
}

export default content;