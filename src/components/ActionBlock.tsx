import styles from '../../styles/Action.module.css';
import React from 'react';

function ActionBlock(props: {text: string[], onClick: Function}) {
  return <button className={styles.halfSquare} onClick={() => props.onClick()}>
    {props.text.map((x, i, lines) => x !== "" || lines.length !== i + 1 ? <div>{x}<br/></div> : <div>{x}</div>)}
  </button>
}

export default ActionBlock;
