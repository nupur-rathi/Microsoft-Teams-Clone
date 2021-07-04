import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { CHAT, VIDEOCALL } from '../../constants';
import { setClass } from '../../data/actions/classReducerActions';
import { useDispatch, useSelector } from 'react-redux';
import { setCaller } from '../../data/actions/callerActions';
import { setWindowState } from '../../data/actions/windowStateActions'

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

export default function BasicButtonGroup({currentWindow}) {

  function videoCall()
  {
    if(currSelectedUser.id in usersList === true)
    {
      dispatch(setWindowState(VIDEOCALL)); 
      dispatch(setClass(true));
      dispatch(setCaller({is: true, from: user.id, to: currSelectedUser.id ,signal: null}));
    }
    else
    {
      alert("This user has disconnected. Cannot call");
    }
  }

  function chat()
  {
    dispatch(setWindowState(CHAT)); 
    dispatch(setClass(false));  
  }

  const classes = useStyles();

  const dispatch = useDispatch();

  const currSelectedUser = useSelector(state => state.currSelectedReducer);
  const usersList = useSelector(state => state.usersListReducer);
  const user = useSelector(state => state.userReducer);

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="outlined primary button group">
        <Button onClick={() => {
          chat();
          }}>
          <ChatOutlinedIcon fontSize="small" />
        </Button>
        <Button onClick={() => {
          videoCall();
        }}>
          <VideocamOutlinedIcon fontSize="small"/></Button>
      </ButtonGroup>
    </div>
  );
}
