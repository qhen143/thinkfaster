import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
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

  var initBench = Array(9).fill().map(obj => obj = {uid: uuidv4(), tier: 0, champion: 0});

  const [bench, setBench] = useState(initBench);
  const [board, setBoard] = useState([[]]);
  const [shop, setShop] = useState(() => GenerateShop(props.shopSize));

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

  // account for odds of copies.
  function Shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
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
    var newBench = [...bench];
    newBench[i] = { uid: uid, tier: unit.tier, champion: unit.champion };
    setBench(newBench);

    // Remove from Shop
    var newShop = shop.map(obj => obj.uid === uid ? 
      {
        uid: uuidv4(),
        tier: 0,
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
        tier: 0,
        champion: 0
      } : obj);
    setBench(newBench);

    // Add back to the unit pool
    // var newPool = {...pool};
    // newPool[unit.tier].push(unit);
    // setPool(newPool);
    // console.log(pool);
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

      // TODO : error handle empty shop for all relevant tiers. e.g. return dead unit.
      // TODO FIX: THIS IS OVERWRITING THE RETURN TO POOL
      let tier = RollTier(1);

      var newTierPool = pool.current.get(tier).filter(x => x.copies > 0);
      Shuffle(newTierPool);
      // // // TODO error handle tier pool e.g. roll for another tier.
      var champion = newTierPool[0];
      champion.copies--;
      
      newUnits[i] = {
        uid: uuidv4(),
        tier: tier,
        champion: champion.Name
      }
    }

    return newUnits;
  };

  function ReturnShopUnitsBackToPool() {
    var newPool = new Map(pool.current);
    shop.forEach((element) => {
      // Add old unit back to pool
      var unit = {...element};

      let tier = unit.tier;
      unit.copies++;

      var newTierPool = newPool.get(tier).map(x => (x.Name === unit.champion ? unit : x)); //this is not being added abc kto pool

      newPool[tier] = newTierPool;
    })
    pool.current = newPool;
  }

  function refreshShop(shopSize) {
    var newShop = GenerateShop(shopSize);
    ReturnShopUnitsBackToPool();
    setShop(newShop);
  };

  // console.log(pool.current.get(1).map(a => a.Name+a.copies).sort());


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
    
    var pool = new Map();

    var hardcodedTiers = [1, 2, 3, 4, 5];
    hardcodedTiers.forEach(tier => pool.set(tier, data.units.filter(unit => unit.Tier === tier).map(unit => ({...unit, copies: GetNumberOfCopies(tier)}))));

    return pool;
  }

  return (
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
  );
}

export default App;
