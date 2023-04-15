// import logo from './logo.svg';
import styles from '../../styles/App.module.css';
import { StrictMode,  } from 'react';
import data from "../set8-5.json"
import React from 'react';
import Game from './Game';

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

  function generateUnitPool() {
    
    // Create Map (by Tier) of Map (by Unit)
    const pool = new Map();

    const tiers = new Set(data.units.map(x => x.Tier));
    tiers.forEach(tier => {
      let units = data.units.filter(unit => unit.Tier === tier).map(unit => ({...unit, Copies: GetNumberOfCopies(tier)})); // Eventually stored in DB
      pool.set(tier, new Map(units.map(x => [x.Id, x])));
    });

    return pool;
  }

  let levelSettings = {
    StartingLevel: 1,
    StartingXP: 0,
    XPModifier: 4,
    LevelThresholds: [2, 6, 10, 20, 36, 56, 80, 100], // TODO use user input
    UnitLimits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  return (
    <StrictMode>
    <div className={styles.App} >
      <header className={styles.AppHeader} >
        <Game shopSize={5} pool={generateUnitPool()} levelSettings={levelSettings}/>
      </header>
    </div>
    </StrictMode>
  );
}

export default App;
