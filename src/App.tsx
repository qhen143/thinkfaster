// import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef, StrictMode, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import data from "./set8-5.json"
import React from 'react';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>
    keyup: KeyboardEvent<HTMLInputElement>
  }
}

interface BaseUnit {
  Id: number,
  Tier: number,
  Name: string
}

interface PoolUnit extends BaseUnit {
  Copies: number
}

interface Unit extends BaseUnit {
  UID: string
}

type ChampionProp = {
  tier: number,
  champion: string,
  onClick: () => void
}

function Action(props: {text: string, onClick: () => void}) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function ShopUnit(props: ChampionProp) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

function BenchUnit(props: ChampionProp) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

//obsolete?
function Shop(props: {units: Array<Unit>}) {
  return (
    <div className="shop">
      {(props.units)?.map((unit: Unit, i : number) => <ShopUnit key={i} tier={unit.Tier} champion={unit.Name} onClick={() => {}}/>)}
    </div>
  )
}

function Unit(props : {value: string}) {
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

const defaultUnit = {Id: 0, Tier: 0, Name: "0"};

function emptyArray(size: number) {
  return Array(size).fill(defaultUnit).map(obj => ({...obj, UID: uuidv4()}));  
}

function initEmptyShop() {
  return emptyArray(5);
};

function initEmptyBench() {
  return emptyArray(9);
};

function Game(props: {pool: Map<number, Map<number, PoolUnit>> , shopSize: number}) {
  const pool = useRef(props.pool);

  const [bench, setBench] = useState(initEmptyBench);
  const [board, setBoard] = useState([[]]);
  const [shop, setShop] = useState(initEmptyShop);

  const [eKeyHeld, setEKeyHeld] = useState(false);

  function downHandler(event: KeyboardEvent<HTMLInputElement>) {
    const {key} = event;
    if (key === 'e') {
      setEKeyHeld(true);
    }
  }

  function upHandler(event: KeyboardEvent<HTMLInputElement>) {
    const {key} = event;
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
      if (bench[i].Name === "0") { // TODO: use something more menaingful
        return i;
      }
    }

    // Bench is full
    return -1;
  }

  function Buy(unit: Unit, uid: string) {
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
    var newShop = shop.map(obj => obj.UID === uid ? 
      {...defaultUnit, UID: uuidv4()} : obj);
    setShop(newShop);
  }

  function Sell(unit: Unit, uid : string) {

    if (!eKeyHeld) {
      return;
    }

    if (unit.Name === "0") {
      return;
    }

    // Remove from Bench
    var newBench = bench.map(obj => obj.UID === uid ? 
      {...defaultUnit, UID: uuidv4()} : obj);
    setBench(newBench);

    // Add back to the unit pool
    const unitInPool = pool.current.get(unit.Tier)?.get(unit.Id);
    if (unitInPool !== undefined)
      unitInPool.Copies++;
  }

  function RollTier(level: number) {
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

  function GenerateShop(shopSize: number) {

    let newUnits: Array<Unit> = [];

    for (let i = 0; i < shopSize; i++) {

      var tier = RollTier(1);
      var units = [...pool.current.get(tier)?.values() ?? []].filter(x => x.Copies > 0);
      
      // No units available
      while (units === undefined || units.length === 0) {
        tier = RollTier(1) // TODO implement level
        units = [...pool.current.get(tier)?.values() ?? []].filter(x => x.Copies > 0);
      }

      // TODO Move to fn
      let rn = Math.floor(Math.random() * units.map(x => x.Copies).reduce((a,b) => a + b));
      units.some(unit => {
        if (rn <= unit.Copies) {
          newUnits.push({
            UID: uuidv4(),
            Id: unit.Id,
            Tier: tier,
            Name: unit.Name
          })
          unit.Copies--;
          return true;
        }

        rn = rn - unit.Copies;
        return false;
      });
    }

    return newUnits;
  };

  function ReturnShopUnitsBackToPool() {
    shop.filter(x => x.Tier !== 0).forEach((element) => {
      // Add back to the unit pool
      const unitInPool = pool.current.get(element.Tier)?.get(element.Id);
      if (unitInPool !== undefined)
        unitInPool.Copies++;
      })
  }

  function refreshShop(shopSize: number) {
    var newShop = GenerateShop(shopSize);
    ReturnShopUnitsBackToPool();
    setShop(newShop);

    return newShop;
  };

  console.log([...pool.current.get(1)?.values() ?? []].map(a => a.Copies + a.Name).sort());


  return (
    <div>
      <Board />

      {/* Bench  */}      
      <div className="row">
        <div className='shop'>
          {(bench)?.map((object) => { return <BenchUnit key={object.UID} tier={object.Tier} champion={object.Name} onClick={() => Sell(object, object.UID)}/> })}
        </div>
      </div>

      {/* ActionBar */}
      <div className="row">
        <div className="actions">
          <Action text="Buy XP (4g)" onClick={() => {}}/>
          <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
        </div>
        <div className="shop">
          {(shop)?.map((object) => <ShopUnit key={object.UID} tier={object.Tier} champion={object.Name} onClick={() => Buy(object, object.UID)}/>)}
        </div>    
      </div>
    </div>
  )
}

function App() {

  function GetNumberOfCopies(tier: number) {
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
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p></p>
        <Game shopSize={5} pool={GenerateUnitPool()}/>
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
