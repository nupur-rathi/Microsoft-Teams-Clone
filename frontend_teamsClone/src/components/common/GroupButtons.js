import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { CHAT, VIDEOCALL, GROUP_VIDEOCALL } from '../../constants';
import { setClass } from '../../data/actions/classReducerActions';
import { setVideoRoom } from '../../data/actions/videoRoomActions';
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
    if(currSelectedUser.type === 'user')
    {
      if(currSelectedUser.id in usersList === true)
      {
        user.socket.current.emit("checkBusy", currSelectedUser.id, state => {
          if(state)
          {
            alert("user is busy. try again later.");
          }
          else
          {
            dispatch(setCaller({is: true, from: user.id, to: currSelectedUser.id ,signal: null}));
            dispatch(setWindowState(VIDEOCALL)); 
            dispatch(setClass(true));
          }
        })
        
      }
      else
      {
        alert("This user has disconnected. Cannot call");
      }
    }
    else
    {
      let isLink = false;
      user.socket.current.emit("isLinkPresent", currSelectedUser.roomName, valid => {
        isLink = valid;
        if(valid && !rooms['joined'].includes(currSelectedUser.roomName))
        {
          alert("you have unjoned this videoroom. cannot call");
        }
        else if(valid)
        {
          dispatch(setWindowState(GROUP_VIDEOCALL)); 
          dispatch(setClass(true));
          dispatch(setVideoRoom(currSelectedUser.roomName));
        }
        else
        {
          alert("This is only a chat room. For group videocall please create and join a link.")
        }
      });    
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
  const rooms = useSelector(state => state.roomsReducer);

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="outlined primary button group">
        <Tooltip title="Chat">
          <Button onClick={() => {
            chat();
            }}>
            <ChatOutlinedIcon fontSize="small" />
          </Button>
        </Tooltip>
        <Tooltip title="Video Call">
          <Button onClick={() => {
            videoCall();
          }}>
            <VideocamOutlinedIcon fontSize="small"/>
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
}
