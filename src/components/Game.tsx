import styles from '../../styles/Game.module.css';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Board from './Board';
import Bench from './Bench';
import Shop from './Shop';
import Actions from './Actions';
import { Unit, PoolUnit } from '../types/Units'
import { LevelSettings } from '../types/LevelSettings'

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>
    keyup: KeyboardEvent<HTMLInputElement>
  }
}

enum SupportedKeys {
  E,
  D,
  R
}

function generateEmptyUnit(): Unit {
  return {Id: 0, Tier: 0, Name: "0", StarLevel: 0, UID: uuidv4()};
}

function emptyArray(size: number) {
  return Array(size).fill(generateEmptyUnit()).map(obj => ({...obj, UID: uuidv4()}));  
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

function Game(props: {pool: Map<number, Map<number, PoolUnit>> , shopSize: number, levelSettings: LevelSettings}) {
  const pool = useRef(props.pool);

  const [bench, setBench] = useState<Unit[]>(initEmptyBench);
  const [board, setBoard] = useState<Unit[]>(initEmptyBoard);
  const [shop, setShop] = useState<Unit[]>(initEmptyShop);
  const [level, setLevel] = useState<number>(props.levelSettings.StartingLevel);
  const [xp, setXP] = useState<number>(props.levelSettings.StartingXP);

  const [eKeyHeld, setEKeyHeld] = useState(false);

  function downHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const {key} = event;
    if (key === 'e') {
      setEKeyHeld(true);
    }
  }

  function upHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const {key} = event;
    if (key === 'e')
      setEKeyHeld(false);
    
    if (key === 'd') {
      // debugger;
      refreshShop(shop, level, props.shopSize, pool.current);
    } else if (key === 'f') {
      buyXP(xp, level, props.levelSettings);
    }
  }

  function isKeyHeld(key: SupportedKeys): boolean {
    switch (key) {
      case SupportedKeys.E:
        return eKeyHeld;
      default:
        return false;
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
  
  function findFirstEmptySlot(array: Unit[]): number {
    return array.findIndex(x => x.Id === 0);
  }

  function findAllMatchingUnits(array: Unit[], unit: Unit): Array<number> {
    return array.reduce((array: Array<number>, x: Unit, index: number) => {
      if (x.Id === unit.Id && x.StarLevel === unit.StarLevel) {
        array.push(index);
      }
      return array;
    }, [])
  }

  function combineUnits(state: {board: Unit[], bench: Unit[], hasCombined: boolean}, unit: Unit): {board: Unit[], bench: Unit[] , hasCombined: boolean} {
    // Get all matching units on board and bench.
    const matchesOnBoard = findAllMatchingUnits(state.board, unit);
    const matchesOnBench = findAllMatchingUnits(state.bench, unit);

    // 1-Star --> 2 Star: Combine one bought from the shop, the other two from the board or bench.
    // 2-Star --> 3 Star: Combine three units from the bench.
    // 3-Star+ // TODO
    if ((matchesOnBoard.length + matchesOnBench.length) !== unit.StarLevel + 1) {
      return state;
    }

    // Remove from board and bench
    matchesOnBoard.forEach(i => state.board[i] = generateEmptyUnit());
    matchesOnBench.forEach(i => state.bench[i] = generateEmptyUnit());

    // Upgrade unit
    var upgradedUnit: Unit = {...unit, StarLevel: ++unit.StarLevel};
    if (matchesOnBoard.length > 0) {
      state.board[matchesOnBoard[0]] = upgradedUnit;
    } else {
      state.bench[findFirstEmptySlot(state.bench)] = upgradedUnit;
    }
    state.hasCombined = true;

    return combineUnits(state, upgradedUnit);
  }

  // TODO magic number
  function rollTier(level: number, odds: number): number {
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

  function getAvailableUnits(array: Array<PoolUnit>, ignore: Array<number>): Array<PoolUnit> {
    return array.filter(x => x.Copies > 0 && !ignore.includes(x.Id))
  }

  function getRandomUnitFromPool(randomNumber: number, units: Array<PoolUnit>): Unit {
    let range = units.map(x => x.Copies).reduce((a,b) => a + b);
    let index = Math.floor(randomNumber * range);

    let unit = generateEmptyUnit();
    // Iterate over units until a unit is selected. 
    units.some(x => {
      if (index <= x.Copies) {
        unit = {
          UID: uuidv4(),
          Id: x.Id,
          Tier: x.Tier,
          Name: x.Name,
          StarLevel: 1
        };
        --x.Copies;
        return true;
      }

      index -= x.Copies;
      return false;
    });

    return unit;
  }

  function buyXP(xp: number, level: number, levelSettings: LevelSettings): void {
    if (level >= levelSettings.MaxLevel)
      return;

    let newXP = xp+levelSettings.XPModifier;
    setXP(newXP);

    const threshold = getXPThresholdForLevel(level, levelSettings.LevelThresholds);
    if (threshold === undefined)
      return; //TODO error handle

    if (newXP >= threshold) {
      setXP(newXP-threshold);
      setLevel(++level)
    }
  }

  function getXPThresholdForLevel(level: number, thresholds: number[]): number {
    return thresholds[level-1]; // Assumption: number of levels matches items in array.
  }

  function generateShop(level: number, shopSize: number, pool: Map<number, Map<number, PoolUnit>>): Unit[] {

    let newUnits: Unit[] = [];
    let completedUnitIds = board.concat(bench).filter(x => x.StarLevel >= 3).map(y => y.Id); // TODO magic number

    for (let i = 0; i < shopSize; i++) {

      // Check pool has no relevant copies of units left.
      if ([...pool.values()].every(x => getAvailableUnits([...x.values()], completedUnitIds).length === 0)) {
        newUnits.push(generateEmptyUnit());
        continue;
      }

      let units;
      // Re-roll until there are units.
      while (units === undefined || units.length === 0) {
        const tier = rollTier(level, Math.random()) 
        units = getAvailableUnits([...pool.get(tier)?.values() ?? []], completedUnitIds);
      }

      newUnits.push(getRandomUnitFromPool(Math.random(), units));
    }

    return newUnits;
  };

  function returnShopUnitsBackToPool(shop: Unit[], pool: Map<number, Map<number, PoolUnit>>): void {
    shop.filter(x => x.Tier !== 0).forEach((element) => {
      const unitInPool = pool.get(element.Tier)?.get(element.Id);
      if (unitInPool !== undefined)
        ++unitInPool.Copies;
      })
  }

  function refreshShop(shop: Unit[], level: number, shopSize: number, pool: Map<number, Map<number, PoolUnit>>): void {
    // debugger;
    returnShopUnitsBackToPool(shop, pool);
    setShop(generateShop(level, shopSize, pool));
  };

  console.log([...pool.current.get(1)?.values() ?? []].map(a => a.Copies + a.Name).sort());

  function sell(unit: Unit, container: Unit[], pool: Map<number, Map<number, PoolUnit>>): void {
    if (!isKeyHeld(SupportedKeys.E)) {
      return;
    }

    if (unit.Id === 0) {
      return;
    }

    // Remove from Bench
    var newContainer = container.map(obj => obj.UID === unit.UID ? generateEmptyUnit() : obj);    //TODO implement board
    setBench(newContainer);

    // Add back to the unit pool
    const unitInPool = pool.get(unit.Tier)?.get(unit.Id);
    if (unitInPool !== undefined)
      // Assumption: star level never less than 1. 1/3/9 copies returned based on star level.
      unitInPool.Copies += Math.pow(3, unit.StarLevel - 1);
  }

  function buy(unit: Unit, shop: Unit[], bench: Unit[], board: Unit[]): void {
    let newBench = [...bench];
    let newBoard = [...board];

    const state = combineUnits({ board: newBoard, bench: newBench, hasCombined: false}, unit)
    if (state.hasCombined) {

      setBoard(state.board);
      setBench(state.bench);
    } else {
      const i = findFirstEmptySlot(newBench);
    
      // Bench is full
      if (i === -1) {
        return;
      }
  
      // Add to bench
      newBench[i] = { ...unit };
      setBench(newBench);
    }

    // Remove from Shop
    const newShop = shop.map(obj => obj.UID === unit.UID ? generateEmptyUnit() : obj);
    setShop(newShop);
  }

  let actions = [
    { id: 1, description: "Buy XP (4g) Level: " + level + " Experience: " + xp + "/" + getXPThresholdForLevel(level, props.levelSettings.LevelThresholds), onClick: () => buyXP(xp, level, props.levelSettings) },
    { id: 2, description: "Refresh (2g)", onClick: () => refreshShop(shop, level, props.shopSize, pool.current) },
  ]

  return (
    <div>
      <Board />

      {/* Bench  */}      
      <div className={styles.row} >
        <Bench units={bench} bench={bench} pool={pool.current} onClick={sell}/>
      </div>

      {/* ActionBar */}
      <div className={styles.row}>
        <Actions actions={actions} />
        <Shop shop={shop} bench={bench} board={board} onClick={buy}/> 
      </div>
    </div>
  )
}

export default Game;
