import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Action(props) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function ShopUnit(props) {
  return <button className={props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

function Shop(props) {
  return (
    <div className="shop">
      {(props.units)?.map((object, i) => <ShopUnit key={i} tier={object.tier} champion={object.champion} />)}
    </div>
  )
}

function Unit(props) {
  <button>{props.value}</button>
}

function Bench() {
  return (
    <div></div>
  )
}

function Board() {
  return (
    <div></div>
  )
}


function Game(props) {
  var initUnits = generateShop(props.shopSize);

  const [bench, setBench] = useState(Array(9).fill({tier: 0, champion: 0}));
  const [board, setBoard] = useState([[]]);
  const [shop, setShop] = useState(initUnits);

  function FindIndexOfFirstEmptyBenchSlot() {
    for (var i = 0; i < bench.length; i++) {
      if (bench[i].tier == 0) {
        return i;
      }
    }

    // Bench is full
    return -1;
  }

  function Buy(unit, index) {
    var i = FindIndexOfFirstEmptyBenchSlot();
    
    // Bench is full
    if (i == -1) {
      return;
    }

    // Add to bench
    var newBench = bench.slice();
    newBench[i] = { tier: unit.tier, champion: unit.champion };
    setBench(newBench);

    // Remove from Shop
    var newShop = shop;
    newShop[i] = {
        tier: "",
        champion: ""
      };
    setShop(newShop);
  }

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
    setShop(generateShop(shopSize));
  };

  return (
    <div>
      <Board />

      {/* Bench  */}
      <div className='shop'>
        {(bench)?.map((object, i) => { return <ShopUnit key={i+123} tier={object.tier} champion={object.champion}/> })}
      </div>

      {/* ActionBar */}
      <div className="row">
        <div className="actions">
          <Action text="Buy XP (4g)" />
          <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
        </div>
        <div className="shop">
          {(shop)?.map((object, i) => <ShopUnit key={i} tier={object.tier} champion={object.champion} onClick={() => Buy(object, i)}/>)}
        </div>    
      </div>
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
        <p></p>
        <Game value="1" shopSize="5" />
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
