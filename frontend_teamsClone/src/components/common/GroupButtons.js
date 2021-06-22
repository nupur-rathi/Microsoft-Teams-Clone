import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PhoneEnabledOutlinedIcon from '@material-ui/icons/PhoneEnabledOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';
import { setClass } from '../../data/actions/classReducerActions';
import { useDispatch, useSelector } from 'react-redux';

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

  const dispatch = useDispatch();

  const currSelectedUser = useSelector(state => state.currSelectedReducer);
  const usersList = useSelector(state => state.usersListReducer);

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="outlined primary button group">
        <Button onClick={() => {setWindowState(CHAT); dispatch(setClass(false))}}><ChatOutlinedIcon fontSize="small" /></Button>
        <Button onClick={() => {
          if(currSelectedUser.id in usersList === true)
          {
            setWindowState(VIDEOCALL); 
            dispatch(setClass(true));
          }
          else
          {
            alert("This user has disconnected. Cannot call");
          }
        }}>
          <VideocamOutlinedIcon fontSize="small"/></Button>
        <Button onClick={() => {
          if(currSelectedUser.id in usersList === true)
          {
            setWindowState(AUDIOCALL); 
            dispatch(setClass(true));
          }
          else
          {
            alert("This user has disconnected. Cannot call");
          }
        }}>
          <PhoneEnabledOutlinedIcon fontSize="small"/></Button>
      </ButtonGroup>
    </div>
  );
}
