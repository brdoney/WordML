import '../assets/css/Header.css';

function header() {
  return (
    <div class="header">
        <h1>Wordle ML</h1>
        <p1>A wordle solution assistant!</p1>
        <br />
        <p1><b>First Word: </b></p1 ><p1 id="word01"></p1>
    </div>
  );
}

export default header;
