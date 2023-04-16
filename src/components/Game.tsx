import styles from '../../styles/Game.module.css';
import { useState, useRef, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Board from './Board';
import Bench from './Bench';
import Shop from './Shop';
import Actions from './Actions';
import MouseTracker from './MouseTracker';
import { useWindowListener } from '../helpers/useWindowListener';
import { Unit, PoolUnit } from '../types/Units'
import { Settings, LevelSettings } from '../types/Settings'
import * as GameHelper from '../helpers/GameHelper'

function Game(props: { settings: Settings, pool: Map<number, Map<number, PoolUnit>> }) {
  const pool = useRef(props.pool);

  const [bench, setBench] = useState<Unit[]>(GameHelper.initEmptyBench);
  const [board, setBoard] = useState<Unit[]>(GameHelper.initEmptyBoard);
  const [shop, setShop] = useState<Unit[]>(GameHelper.initEmptyShop);
  const [level, setLevel] = useState<number>(props.settings.StartingLevel);
  const [xp, setXP] = useState<number>(props.settings.StartingXP);

  const [eKeyHeld, setEKeyHeld] = useState(false);

  useWindowListener('keydown', downHandler);
  useWindowListener('keyup', upHandler, [shop, pool, xp, level]);

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
      refreshShop(shop, level, props.settings.shopSize, pool.current, board, bench);
    } else if (key === 'f') {
      buyXP(xp, level, props.settings);
    }
  }

  function isKeyHeld(key: string): boolean {
    switch (key) {
      case 'e':
        return eKeyHeld;
      default:
        return false;
    }
  }

  function buyXP(xp: number, level: number, levelSettings: LevelSettings): void {
    if (level >= levelSettings.MaxLevel)
      return;

    let newXP = xp+levelSettings.XPModifier;
    setXP(newXP);

    const threshold = GameHelper.getXPThresholdForLevel(level, levelSettings.LevelThresholds);
    if (threshold === undefined)
      return; //TODO error handle

    while (newXP >= threshold) {
      newXP -= threshold;
      setXP(newXP);
      setLevel(++level)
    }
  }

  function refreshShop(shop: Unit[], level: number, shopSize: number, pool: Map<number, Map<number, PoolUnit>>, board: Unit[], bench: Unit[]): void {
    GameHelper.returnShopUnitsBackToPool(shop, pool);
    const unitIdsToIgnore = board.concat(bench).filter(x => x.StarLevel >= 3).map(y => y.Id); // TODO magic number
    setShop(GameHelper.generateShop(level, shopSize, pool, unitIdsToIgnore));
  };

  function sell(unit: Unit, container: Unit[], pool: Map<number, Map<number, PoolUnit>>): void {
    if (!isKeyHeld('e')) {
      return;
    }

    if (unit.Id === 0) {
      return;
    }

    // Remove from Bench
    var newContainer = container.map(obj => obj.UID === unit.UID ? GameHelper.generateEmptyUnit() : obj);    //TODO implement board
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

    const state = GameHelper.combineUnits({ board: newBoard, bench: newBench, hasCombined: false}, unit)
    if (state.hasCombined) {

      setBoard(state.board);
      setBench(state.bench);
    } else {
      const i = GameHelper.findFirstEmptySlot(newBench);
    
      // Bench is full
      if (i === -1) {
        return;
      }
  
      // Add to bench
      newBench[i] = { ...unit };
      setBench(newBench);
    }

    // Remove from Shop
    const newShop = shop.map(obj => obj.UID === unit.UID ? GameHelper.generateEmptyUnit() : obj);
    setShop(newShop);
  }

  let xpString = level >= props.settings.MaxLevel ? "" : " Experience: " + xp + "/" + GameHelper.getXPThresholdForLevel(level, props.settings.LevelThresholds);
  let actions = [
    { id: 1, descriptionByLine: ["Buy XP (4g)", "Level: " + level, xpString], onClick: () => buyXP(xp, level, props.settings) },
    { id: 2, descriptionByLine: ["Refresh (2g)"], onClick: () => refreshShop(shop, level, props.settings.shopSize, pool.current, board, bench) },
  ]

  let mouseTracker = <></>;
  if (props.settings.UseMouseTracker) {
    mouseTracker = <MouseTracker/>;
  }

  console.log([...pool.current.get(1)?.values() ?? []].map(a => a.Copies + a.Name).sort());
  
  return (
    <div>
      {mouseTracker}
      <Board unitLimit={GameHelper.getUnitLimitForLevel(level, props.settings.UnitLimits)} />

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
