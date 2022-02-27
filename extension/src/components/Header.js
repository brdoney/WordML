import '../assets/css/Header.css';
import logo from '../assets/img/logo.png';

function header() {
  return (
    <div className="header">
      <img src={logo} alt="WordML Logo" />
      <br />
      <h1>A machine learning wordle assistant</h1>
    </div>
  );
}

export default header;
