import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from "./set8-5.json"

function Action(props) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function ShopUnit(props) {
  return <button className={props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

function BenchUnit(props) {
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
  const [pool] = useState(props.units);

  var initUnits = generateShop(props.shopSize);
  var initBench = Array(9).fill().map(obj => obj = {uid: uuidv4(), tier: "unit", champion: 0});

  const [bench, setBench] = useState(initBench);
  const [board, setBoard] = useState([[]]);
  const [shop, setShop] = useState(initUnits);

  const [eKeyHeld, setEKeyHeld] = useState(false);

  function downHandler({key}) {
    if (key === 'e') {
      setEKeyHeld(true);
    }
  }

  function upHandler({key}) {
    if (key === 'e') {
      setEKeyHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  function FindIndexOfFirstEmptyBenchSlot() {
    for (var i = 0; i < bench.length; i++) {
      if (bench[i].champion === 0) { // TODO: use something more menaingful
        return i;
      }
    }

    // Bench is full
    return -1;
  }

  function Buy(unit, uid) {
    var i = FindIndexOfFirstEmptyBenchSlot();
    
    // Bench is full
    if (i === -1) {
      return;
    }

    // Add to bench
    var newBench = bench.slice();
    newBench[i] = { uid: uid, tier: unit.tier, champion: unit.champion };
    setBench(newBench);

    // Remove from Shop
    var newShop = shop.map(obj => obj.uid === uid ? 
      {
        uid: uuidv4(),
        tier: "unit",
        champion: 0
      } : obj);
    setShop(newShop);
  }

  function Sell(unit, uid) {

    if (!eKeyHeld) {
      return;
    }

    if (unit.champion === 0) {
      return;
    }

    // Remove from Bench
    var newBench = bench.map(obj => obj.uid === uid ? 
      {
        uid: uuidv4(),
        tier: "unit",
        champion: 0
      } : obj);
    setBench(newBench);
  }

  function RollTier(level) {
    var odds = Math.random();
    // TODO Get from DB/ make odds an object.
    switch(level) {
      case 3:
        if (odds <= 0.25) {
          return 2;
        }
        return 1;
      case 4:
        if (odds <= 0.15) {
          return 3;
        } else if (odds <= 0.15 + 0.30) {
          return 2;
        }
        return 1;
      case 5:
        if (odds <= 0.02) {
          return 4;
        } else if (odds <= 0.02 + 0.2) {
          return 3;
        } else if (odds <= 0.02 + 0.2 + 0.33) {
          return 2;
        }
        return 1;
      case 6:
        if (odds <= 0.05) {
          return 4;
        } else if (odds <= 0.05 + 0.3) {
          return 3;
        } else if (odds <= 0.05 + 0.3 + 0.4) {
          return 2;
        }
        return 1; 
      case 7:
        if (odds <= 0.01) {
          return 5;
        } else if (odds <= 0.01 + 0.15) {
          return 4;
        } else if (odds <= 0.01 + 0.15 + 0.35) {
          return 3;
        } else if (odds <= 0.01 + 0.15 + 0.35 + 0.30) {
          return 2;
        }
        return 1;
      case 8:
        if (odds <= 0.04) {
          return 5;
        } else if (odds <= 0.04 + 0.25) {
          return 4;
        } else if (odds <= 0.04 + 0.25 + 0.35) {
          return 3;
        } else if (odds <= 0.04 + 0.25 + 0.35 + 0.2) {
          return 2;
        }
        return 1;
      case 9:
        if (odds <= 0.16) {
          return 5;
        } else if (odds <= 0.16 + 0.25) {
          return 4;
        } else if (odds <= 0.16 + 0.25 + 0.35) {
          return 3;
        } else if (odds <= 0.16 + 0.25 + 0.35 + 0.2) {
          return 2;
        }
        return 1;
      default: // Level 1 & 2
        return 1;                
    }
  }

  function generateShop(shopSize) {
    let newUnits = [];
    for (let i = 0; i < shopSize; i++) {

      // TODO : error handle empty shop for all relevant tiers. e.g. return dead unit.
      let tier = RollTier(9);
      let tierString = "tier" + tier;
      console.log(tier);
      console.log(pool);
      let champion = pool[tier].pop();

      // TODO error handle tier pool e.g. roll for another tier.
      
      newUnits[i] = {
        uid: uuidv4(),
        tier: tierString,
        champion: champion.Name
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
      <div className="row">
        <div className='shop'>
          {(bench)?.map((object, i) => { return <BenchUnit key={object.uid} tier={object.tier} champion={object.champion} onClick={() => Sell(object, object.uid)}/> })}
        </div>
      </div>

      {/* ActionBar */}
      <div className="row">
        <div className="actions">
          <Action text="Buy XP (4g)" />
          <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
        </div>
        <div className="shop">
          {(shop)?.map((object, i) => <ShopUnit key={object.uid} tier={object.tier} champion={object.champion} onClick={() => Buy(object, object.uid)}/>)}
        </div>    
      </div>
    </div>
  )
}

function App() {

  function GetNumberOfCopies(tier) {
    switch(tier) {
      case 1:
        return 29;
      case 2:
        return 22;
      case 3:
        return 18;
      case 4:
        return 12;
      case 5:
        return 10;
      default:
        return 0;
    }
  }

  function GenerateUnitPool() {
    // TODO dont hard code tiers.
    var unitsByTier = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    };
    data.units.forEach(element => {
      var tier = element.Tier;
      let numDuplicates = GetNumberOfCopies(tier);
      for (var i = 0; i < numDuplicates; i++) {
        var copy = {...element};
        copy.uid = uuidv4();
        console.log(tier);
        unitsByTier[tier].push(copy);
      }
    }); 
    return unitsByTier;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p></p>
        <Game value="1" shopSize="5" units={GenerateUnitPool()} />
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
