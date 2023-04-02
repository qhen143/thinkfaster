import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef, StrictMode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from "./set8-5.json"

function Action(props) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function ShopUnit(props) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

function BenchUnit(props) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion}</button>
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
  const pool = useRef(props.pool);

  var initBench = Array(9).fill().map(obj => obj = {Uid: uuidv4(), Tier: 0, Champion: 0});
  var initShop = Array(5).fill().map(obj => obj = {Uid: uuidv4(), Tier: 0, Champion: 0});

  const [bench, setBench] = useState(initBench);
  const [board, setBoard] = useState([[]]);
  const [shop, setShop] = useState(initShop);

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
      if (bench[i].Champion === 0) { // TODO: use something more menaingful
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
    var newBench = [...bench];
    newBench[i] = { ...unit };
    setBench(newBench);

    // Remove from Shop
    var newShop = shop.map(obj => obj.Uid === uid ? 
      {
        Uid: uuidv4(),
        Tier: 0,
        Champion: 0
      } : obj);
    setShop(newShop);
  }

  function Sell(unit, uid) {

    if (!eKeyHeld) {
      return;
    }

    if (unit.Champion === 0) {
      return;
    }

    // Remove from Bench
    var newBench = bench.map(obj => obj.Uid === uid ? 
      {
        Uid: uuidv4(),
        Tier: 0,
        Champion: 0
      } : obj);
    setBench(newBench);

    // Add back to the unit pool
    pool.current.get(unit.Tier).get(unit.Id).Copies++;
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

  function GenerateShop(shopSize) {

    let newUnits = [];

    for (let i = 0; i < shopSize; i++) {

      var tier = RollTier(1);
      var units = [...pool.current.get(tier).values()].filter(x => x.Copies > 0);
      
      // No units available
      while (units === undefined || units.length == 0) {
        tier = RollTier(1) // TODO implement level
        units = [...pool.current.get(tier).values()].filter(x => x.Copies > 0);
      }

      // TODO Move to fn
      var rn = Math.floor(Math.random() * units.map(x => x.Copies).reduce((a,b) => a + b));
      var champion;
      units.some(x => {
        if (rn <= x.Copies) {
          champion = x;
          return true;
        }

        rn = rn - x.Copies;
      });
      champion.Copies--;

      newUnits.push({
        Uid: uuidv4(),
        Id: champion.Id,
        Tier: tier,
        Champion: champion.Name
      })
    }

    return newUnits;
  };

  function ReturnShopUnitsBackToPool() {
    shop.filter(x => x.Tier !== 0).forEach((element) => {
      // Add old unit back to pool
      pool.current.get(element.Tier).get(element.Id).Copies++;
    })
  }

  function refreshShop(shopSize) {
    var newShop = GenerateShop(shopSize);
    ReturnShopUnitsBackToPool();
    setShop(newShop);

    return newShop;
  };

  console.log([...pool.current.get(1).values()].map(a => a.Copies + a.Name).sort());


  return (
    <div>
      <Board />

      {/* Bench  */}      
      <div className="row">
        <div className='shop'>
          {(bench)?.map((object, i) => { return <BenchUnit key={object.Uid} tier={object.Tier} champion={object.Champion} onClick={() => Sell(object, object.Uid)}/> })}
        </div>
      </div>

      {/* ActionBar */}
      <div className="row">
        <div className="actions">
          <Action text="Buy XP (4g)" />
          <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
        </div>
        <div className="shop">
          {(shop)?.map((object, i) => <ShopUnit key={object.Uid} tier={object.Tier} champion={object.Champion} onClick={() => Buy(object, object.Uid)}/>)}
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
    
    // Create Map (by Tier) of Map (by Unit)
    var pool = new Map();

    var tiers = new Set(data.units.map(x => x.Tier));
    tiers.forEach(tier => {
      let units = data.units.filter(unit => unit.Tier === tier).map(unit => ({...unit, Copies: GetNumberOfCopies(tier)})); // Eventually stored in DB
      pool.set(tier, new Map(units.map(x => [x.Id, x])));
    });

    return pool;
  }

  return (
    <StrictMode>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p></p>
        <Game value="1" shopSize="5" pool={GenerateUnitPool()}/>
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
    </StrictMode>
  );
}

export default App;
