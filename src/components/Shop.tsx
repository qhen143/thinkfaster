import React from 'react';
import ShopUnit from './ShopUnit';
import { Unit } from "../types/Units";

function Shop(props: {shop: Unit[], bench: Unit[], board: Unit[], onClick: Function}) {
  return (
    <div>
      {(props.shop)?.map((unit) => <ShopUnit key={unit.UID} unit={unit} onClick={() => props.onClick(unit, props.shop, props.bench, props.board)}/>)}
    </div>   
  )
}

export default Shop;