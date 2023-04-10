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
  UID: string,
  StarLevel: number
}

type ChampionProp = {
  tier: number,
  champion: string,
  starLevel: string,
  onClick: () => void
}

function Action(props: {text: string, onClick: () => void}) {
  return <button className="halfSquare" onClick={() => props.onClick()}>{props.text}</button>
}

function ShopUnit(props: ChampionProp) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion}</button>
}

function BenchUnit(props: ChampionProp) {
  return <button className={"tier" + props.tier} onClick={() => props.onClick()}>{props.champion + props.starLevel}</button>
}

function Board() {
  return (
    <div></div>
  )
}

const defaultUnit = {Id: 0, Tier: 0, Name: "0", StarLevel: 0};

function emptyArray(size: number) {
  return Array(size).fill(defaultUnit).map(obj => ({...obj, UID: uuidv4()}));  
}

function initEmptyShop() {
  return emptyArray(5);
};

function initEmptyBench() {
  return emptyArray(9);
};

function initEmptyBoard() {
  return emptyArray(4*7); //4 rows 7 cols
}

function Game(props: {pool: Map<number, Map<number, PoolUnit>> , shopSize: number}) {
  const pool = useRef(props.pool);

  const [bench, setBench] = useState<Array<Unit>>(initEmptyBench);
  const [board, setBoard] = useState<Array<Unit>>(initEmptyBoard);
  const [shop, setShop] = useState<Array<Unit>>(initEmptyShop);

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
  
  function FindFirstEmptySlot(array: Array<Unit>) {
    return array.findIndex(x => x.Id === 0);
  }

  function FindAllMatchingUnits(array: Array<Unit>, unit: Unit) {
    return array.reduce((array: Array<number>, x: Unit, index: number) => {
      if (x.Id === unit.Id && x.StarLevel === unit.StarLevel) {
        array.push(index);
      }
      return array;
    }, [])
  }

  function CombineUnits(state: {board: Array<Unit>, bench: Array<Unit>, hasCombined: boolean}, unit: Unit): {board: Array<Unit>, bench: Array<Unit> , hasCombined: boolean} {
    // Get all matching units on board and bench.
    const matchesOnBoard = FindAllMatchingUnits(state.board, unit);
    const matchesOnBench = FindAllMatchingUnits(state.bench, unit);

    // 1-Star --> 2 Star: Combine one bought from the shop, the other two from the board or bench.
    // 2-Star --> 3 Star: Combine three units from the bench.
    // 3-Star+ // TODO
    if ((matchesOnBoard.length + matchesOnBench.length) !== unit.StarLevel + 1) {
      return state;
    }

    // Remove from board and bench
    matchesOnBoard.forEach(i => state.board[i] = {...defaultUnit, UID: uuidv4()});
    matchesOnBench.forEach(i => state.bench[i] = {...defaultUnit, UID: uuidv4()});

    // Upgrade unit
    var upgradedUnit = {...unit};
    upgradedUnit.StarLevel++;
    if (matchesOnBoard.length > 0) {
      state.board[matchesOnBoard[0]] = upgradedUnit;
    } else {
      state.bench[FindFirstEmptySlot(state.bench)] = upgradedUnit;
    }
    state.hasCombined = true;

    return CombineUnits(state, upgradedUnit);
  }

  function Buy(unit: Unit) {
    let newBench = [...bench];
    let newBoard = [...board];

    const state = CombineUnits({ board: newBoard, bench: newBench, hasCombined: false}, unit)
    if (state.hasCombined) {

      setBoard(state.board);
      setBench(state.bench);
    } else {
      const i = FindFirstEmptySlot(newBench);
    
      // Bench is full
      if (i === -1) {
        return;
      }
  
      // Add to bench
      newBench[i] = { ...unit };
      setBench(newBench);
    }

    // Remove from Shop
    const newShop = shop.map(obj => obj.UID === unit.UID ? 
      {...defaultUnit, UID: uuidv4()} : obj);
    setShop(newShop);
  }

  function Sell(unit: Unit) {
    if (!eKeyHeld) {
      return;
    }

    if (unit.Name === "0") {
      return;
    }

    // Remove from Bench
    var newBench = bench.map(obj => obj.UID === unit.UID ? 
      {...defaultUnit, UID: uuidv4()} : obj);
    setBench(newBench);

    // Add back to the unit pool
    const unitInPool = pool.current.get(unit.Tier)?.get(unit.Id);
    if (unitInPool !== undefined)
      // Assumption: star level never less than 1. 1/3/9 copies returned based on star level.
      unitInPool.Copies = unitInPool.Copies + Math.pow(3, unit.StarLevel - 1); 
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
    let completedUnitIds = board.concat(bench).filter(x => x.StarLevel >= 3).map(y => y.Id);

    for (let i = 0; i < shopSize; i++) {

      let tier = RollTier(1);
      let units = [...pool.current.get(tier)?.values() ?? []].filter(x => x.Copies > 0 && !completedUnitIds.includes(x.Id));
      
      // No units available
      while (units === undefined || units.length === 0) {
        tier = RollTier(1) // TODO implement level
        units = [...pool.current.get(tier)?.values() ?? []].filter(x => x.Copies > 0 && !completedUnitIds.includes(x.Id));
      }

      // TODO Move to fn
      let rn = Math.floor(Math.random() * units.map(x => x.Copies).reduce((a,b) => a + b));
      units.some(unit => {
        if (rn <= unit.Copies) {
          newUnits.push({
            UID: uuidv4(),
            Id: unit.Id,
            Tier: tier,
            Name: unit.Name,
            StarLevel: 1
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
    const newShop = GenerateShop(shopSize);
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
          {(bench)?.map((object) => { return <BenchUnit key={object.UID} tier={object.Tier} champion={object.Name} starLevel={object.StarLevel.toString()} onClick={() => Sell(object)}/> })}
        </div>
      </div>

      {/* ActionBar */}
      <div className="row">
        <div className="actions">
          <Action text="Buy XP (4g)" onClick={() => {}}/>
          <Action text="Refresh (2g)" onClick={() => refreshShop(props.shopSize)}/>
        </div>
        <div className="shop">
          {(shop)?.map((object) => <ShopUnit key={object.UID} tier={object.Tier} champion={object.Name}  starLevel={object.StarLevel.toString()} onClick={() => Buy(object)}/>)}
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
    const pool = new Map();

    const tiers = new Set(data.units.map(x => x.Tier));
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
