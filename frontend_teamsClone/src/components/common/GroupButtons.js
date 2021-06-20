import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PhoneEnabledOutlinedIcon from '@material-ui/icons/PhoneEnabledOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';


const useStyles = makeStyles((theme) => ({
  root: { 
     
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      backgroundColor: "white",
    },
  },
}));

export default function BasicButtonGroup({currentWindow, setWindowState}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="outlined primary button group">
        <Button onClick={() => {setWindowState(CHAT)}}><ChatOutlinedIcon fontSize="small" /></Button>
        <Button onClick={() => {setWindowState(VIDEOCALL)}}><VideocamOutlinedIcon fontSize="small"/></Button>
        <Button onClick={() => {setWindowState(AUDIOCALL)}}><PhoneEnabledOutlinedIcon fontSize="small"/></Button>
      </ButtonGroup>
    </div>
  );
}
