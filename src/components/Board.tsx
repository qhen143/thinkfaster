import React from 'react';
import styles from '../../styles/Game.module.css';
import ActiveUnit from './ActiveUnit';
import { BoardSettings } from '../types/Settings';
import { GameState } from '../types/GameState';


function Board(props: { state: GameState, onClick: Function, settings: BoardSettings, unitLimit: number }) {
  const state = props.state;

  function splitArrayIntoChunks<Type>(array: Type[], chunkSize: number): Type[][] {
    const result = [];
  
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
  
    return result;
  }
  
  const boardByRow = splitArrayIntoChunks(state.Container, props.settings.columns);

  return (
    <>    
      <div>0/{props.unitLimit}</div>
      {boardByRow.map((row) => 
          (<div className={styles.row}>
            {row.map((unit) => <ActiveUnit key={unit.UID} unit={unit} onClick={() => props.onClick(unit, state)}/>)}
          </div>)
        )
      }
      <p></p>
      <div className={styles.row}>

      </div>
    </>
  )
}

export default Board;
