import { Drawer } from '@mui/material';
import styles from '../../styles/Action.module.css';
import React from 'react';
import Menu from "./Menu";

function SettingsDrawer(props: {open: boolean, onClick: Function}) {
  return (
    <>
      <Drawer
        anchor="right"
        open={props.open}
        onClose={() => props.onClick(props.open)}
        PaperProps={{
            sx: {
                // borderRadius: 7,
                // mr: -2,
                // width: 1/4,
                minWidth: 1/4,
                overflowY: 'scroll',
                scrollbarWidth: 'thin',
                '::-webkit-scrollbar': {
                width: '0.5rem',
                },
                '::-webkit-scrollbar-thumb': {
                borderRadius: '1rem',
                backgroundColour: 'rgba(0, 0, 0)',
                },
            },
        }}
      >
          <Menu onClick={() => props.onClick(props.open)}/>
      </Drawer>
    </>
  )
}

export default SettingsDrawer;
