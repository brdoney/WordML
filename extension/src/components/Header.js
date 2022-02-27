import '../assets/css/Header.css';
import logo from '../assets/img/logo.png';

function header() {
  return (
    <div class="header">
      <img src={logo} alt="WordML Logo" />
      <br />
      <p1>A machine learning wordle assistant</p1>
    </div>
  );
}

export default header;
