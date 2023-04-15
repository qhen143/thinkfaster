import React from 'react';
import BenchUnit from './BenchUnit';
import { Unit, PoolUnit } from "../types/Units";

function Bench(props: {units: Unit[], bench: Unit[], pool: Map<number, Map<number, PoolUnit>>, onClick: Function}) {
  return (
    <div >
      {(props.units)?.map((unit) => { return <BenchUnit key={unit.UID} unit={unit} onClick={() => props.onClick(unit, props.bench, props.pool)}/> })}
    </div>
  )
}

export default Bench;
