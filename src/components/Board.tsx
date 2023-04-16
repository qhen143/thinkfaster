import React from 'react';
import BenchUnit from './BenchUnit';
import { Unit, PoolUnit } from '../types/Units'

function Board(props: { unitLimit: number }) {
  return (
    <>    
      <div>0/{props.unitLimit}</div>
      <div></div>
    </>
  )
}

export default Board;
