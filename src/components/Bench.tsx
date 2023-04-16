import React from 'react';
import ActiveUnit from './ActiveUnit';
import { GameState } from '../types/GameState';

function Bench(props: { state: GameState, onClick: Function}) {
  const state = props.state;
  return (
    <div >
      {(state.Container)?.map((unit) => { return <ActiveUnit key={unit.UID} unit={unit} onClick={() => props.onClick(unit, state)}/> })}
    </div>
  )
}

export default Bench;
