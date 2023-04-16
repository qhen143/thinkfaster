import styles from '../../styles/Unit.module.css';
import React from 'react';
import { Unit } from "../types/Units";

function ActiveUnit(props: {unit: Unit, onClick: Function}) {

  function getUnitStyle(className: string) {
    switch (className) {
      case "tier1":
        return styles.tier1;
      case "tier2":
        return styles.tier2;
      case "tier3":
        return styles.tier3;
      case "tier4":
        return styles.tier4;
      case "tier5":
        return styles.tier5;
      default:
        return styles.tier0;
    }
  }

  const unit: Unit = props.unit;
  return <button className={getUnitStyle("tier" + unit.Tier)} onClick={() => props.onClick()}>{unit.Name + unit.StarLevel}</button>
}

export default ActiveUnit;
