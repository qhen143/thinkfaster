import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Action(props) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function Unit(props) {
  return <button className={props.tier}>{props.champion}</button>
}

function Shop(props) {
  return (
    <div className="shop">
      {(props.units)?.map((object, i) => <Unit key={i} tier={object.tier} champion={object.champion} />)}
    </div>
  )
}

function ActionBar(props) {
  function generateShop(shopSize) {
    let newUnits = [];
    for (let i = 0; i < shopSize; i++) {
      let tier = "tier" + Math.ceil(Math.random() * 5);
      let champion = (Math.random() + 1).toString(36).substring(7);
      
      newUnits[i] = {
        tier: tier,
        champion: champion
      }
    }
    return newUnits;
  };

  function refreshShop(shopSize) {
    setUnits(generateShop(shopSize));
  };

  var initUnits = generateShop(props.shopSize);
  const [units, setUnits] = useState(initUnits);

  {console.log(props.shopSize)}

  return (
    <div className="row">
      <div className="actions">
        <Action text="Buy XP (4g)" />
        <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
      </div>
      <Shop shopSize={props.shopSize} units={units} />      
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
        <Unit value="1" />
        <Shop value="1" />
        <p></p>
        <ActionBar value="1" shopSize="5" />
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
