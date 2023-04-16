import React from 'react';
import ActionBlock from './ActionBlock';
import { Action } from '../types/Action';

function Actions(props: {actions: Action[]}) {
  return (
    <div>
      {props.actions.map(action => <ActionBlock key={action.id} text={action.descriptionByLine} onClick={() => action.onClick()} />)}
    </div>
  )
}

export default Actions;
