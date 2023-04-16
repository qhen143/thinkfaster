import { v4 as uuidv4 } from 'uuid';
import { Unit, PoolUnit } from '../types/Units'

// InitialStates
export function initEmptyShop(size: number): Unit[] {
    return emptyArray(size);
};

export function initEmptyBench(size: number): Unit[] {
    return emptyArray(size);
};

export function initEmptyBoard(size: number): Unit[] {
    return emptyArray(size); //4 rows 7 cols
}

export function emptyArray(size: number) {
    return Array(size).fill(null).map(obj => generateEmptyUnit());  
}

// Get
export function getAvailableUnits(array: Array<PoolUnit>, ignore: Array<number>): Array<PoolUnit> {
    return array.filter(x => x.Copies > 0 && !ignore.includes(x.Id))
}

export function getXPThresholdForLevel(level: number, thresholds: number[]): number {
    return thresholds[level-1]; // Assumption: number of levels matches the size of thresholds.
}

export function getUnitLimitForLevel(level: number, unitLimits: number[]): number {
    return unitLimits[level-1]; // Assumption: number of levels matches the size of unitLimit.
}

// Find
export function findFirstEmptySlot(array: Unit[]): number {
    return array.findIndex(x => x.Id === 0);
}

export function findAllMatchingUnits(array: Unit[], unit: Unit): Array<number> {
    return array.reduce((array: Array<number>, x: Unit, index: number) => {
        if (x.Id === unit.Id && x.StarLevel === unit.StarLevel) {
        array.push(index);
        }
        return array;
    }, [])
}



export function generateEmptyUnit(): Unit {
    return {Id: 0, Tier: 0, Name: "0", StarLevel: 0, UID: uuidv4()};
  }
  
// Complex logic
// TODO magic number
export function rollTier(level: number, odds: number): number {
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

export function getRandomUnitFromPool(randomNumber: number, units: Array<PoolUnit>): Unit {
    let range = units.map(x => x.Copies).reduce((a,b) => a + b);
    let index = Math.floor(randomNumber * range);

    let unit = generateEmptyUnit();
    // Iterate over units until a unit is selected. 
    units.some(x => {
      if (index <= x.Copies) {
        unit = {
            ...x,
            UID: uuidv4(),
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

export function combineUnits(state: {board: Unit[], bench: Unit[], hasCombined: boolean}, unit: Unit): {board: Unit[], bench: Unit[] , hasCombined: boolean} {
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


export function generateShop(level: number, shopSize: number, pool: Map<number, Map<number, PoolUnit>>, ignoreList: number[]): Unit[] {

    let newUnits: Unit[] = [];
    for (let i = 0; i < shopSize; i++) {

      // Check pool has no relevant copies of units left.
      if ([...pool.values()].every(x => getAvailableUnits([...x.values()], ignoreList).length === 0)) {
        newUnits.push(generateEmptyUnit());
        continue;
      }

      let units;
      // Re-roll until there are units.
      while (units === undefined || units.length === 0) {
        const tier = rollTier(level, Math.random()) 
        units = getAvailableUnits([...pool.get(tier)?.values() ?? []], ignoreList);
      }

      newUnits.push(getRandomUnitFromPool(Math.random(), units));
    }

    return newUnits;
};

export function returnShopUnitsBackToPool(shop: Unit[], pool: Map<number, Map<number, PoolUnit>>): void {
    shop.filter(x => x.Tier !== 0).forEach((element) => {
      const unitInPool = pool.get(element.Tier)?.get(element.Id);
      if (unitInPool !== undefined)
        ++unitInPool.Copies;
      })
}