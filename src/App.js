import logo from './logo.svg';
import './App.css';

function HalfSquare(props) {
  return <button className="halfSquare">{props.value}</button>
}

function Square(props) {
  return <button className="square">{props.value}</button>
}

function Shop(props) {
  return (
    <div className="shop">
      <Square value={props.value} />
      <Square value={props.value} />
      <Square value={props.value} />
      <Square value={props.value} />
      <Square value={props.value} />
    </div>
  )
}

function ActionBar(props) {
  return (
    <div className="row">
      <div className="actions">
        <HalfSquare value={props.value} />
        <HalfSquare value={props.value} />
        </div>
      <Shop value={props.value} />      
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Square value="1" />
        <Shop value="1" />
        <p></p>
        <ActionBar value="1" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
