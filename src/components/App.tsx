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
    <div className={styles.App} >
      <header className={styles.AppHeader} >
        <Game shopSize={5} pool={GenerateUnitPool()}/>
      </header>
    </div>
    </StrictMode>
  );
}

export default App;
