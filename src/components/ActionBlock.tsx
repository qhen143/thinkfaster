import styles from '../../styles/Action.module.css';
import React from 'react';

function ActionBlock(props: {text: string, onClick: Function}) {
  return <button className={styles.halfSquare} onClick={() => props.onClick()}>{props.text}</button>
}

export default ActionBlock;
