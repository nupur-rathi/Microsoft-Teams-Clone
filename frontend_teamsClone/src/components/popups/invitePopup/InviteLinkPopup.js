import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../../../styles/invitePopup.css';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { addInvite } from '../../../data/actions/inviteActions';
import { setWindowState } from '../../../data/actions/windowStateActions';
import { setClass } from '../../../data/actions/classReducerActions';
import { GROUP_VIDEOCALL } from '../../../constants';

const InviteLinkPopup = ({ setShow }) => {

    const infoText = `You can create invite link for group video chats and can join other group video invite links. Copy the invite links you created and send it to your friends to join the group video call. You can also join any group video call by pasting the invite link in join input that shows after clicking the join button.`

    const [ info, setInfo ] = useState(false);
    const [ showInvites, setShowInvites] = useState(false);
    const [ join, showJoin ] = useState(false);
    const [ inviteCreated, setInviteCreated ] = useState("");

    const dispatch = useDispatch();
    const inputLinkRef = useRef();

    const linksList = useSelector(state => state.inviteReducer);
    const user = useSelector(state => state.userReducer);

    function createInvite(){
        const inviteLink = uuidv4();
        setInviteCreated(inviteLink);
        dispatch(addInvite(inviteLink));
        showJoin(false);
        user.socket.current.emit("addLink", inviteLink);
    }

    function showJoinInvite(){
        showJoin(true);
        setInviteCreated("");
    }

    function joinInvite(link){

        let isValid = false;
        user.socket.current.emit("isLinkPresent", link, validity => {
            isValid = validity;
            console.log(isValid);
            if(link && isValid)
            {
                dispatch(setWindowState(GROUP_VIDEOCALL)); 
                dispatch(setClass(true));
                setShow(false);
            }
            else
            {
                alert("input is empty. Enter a link");
            }
        });        
    }

    return (
        <div className="invitePopup">
            <div className="invPopFixed">
                <div className="smallButtonDiv inviteSmallButtonDivs">
                    <button className="inviteSmallButtons" onClick={()=>{setShow(false);}}><CloseRoundedIcon /></button>
                </div>
                <button className="inviteButtons" onClick={()=>{ createInvite(); }}>
                    Create a new Invite Link</button>
                <button className="inviteButtons" onClick={()=>{ showJoinInvite(); }}>
                    Join a Invite Link</button>
                <div className="inviteDivs">
                    {join ? 
                        <>
                            <input className="inputLink" ref={inputLinkRef}></input>
                            <button className="joinLink" onClick={()=>joinInvite(inputLinkRef.current.value)}>Join</button>
                        </>
                        :
                        <span>You created an invite :<br></br>{inviteCreated}</span>
                    }
                </div>
                <div className="smallButtonDiv inviteSmallButtonDivs">
                    <button className="inviteSmallButtons" onClick={()=>{
                        setInfo(false); 
                        setShowInvites(!showInvites);
                        }}>
                        <LinkRoundedIcon /></button>
                    <button className="inviteSmallButtons" onClick={()=>{
                        setInfo(!info); 
                        setShowInvites(false);
                        }}>
                        <InfoOutlinedIcon /></button>
                </div>
            </div>
            {(info || showInvites) ? <div className="expandDiv">
                { info ? 
                <div className="infoDiv">
                    Info : <br></br><br></br>
                    {infoText} 
                </div> : <></> }
                { showInvites ? 
                <div className="invitesListDiv">
                    <span>Invites you created :</span>
                    <br></br>
                    <br></br>
                    <ul className="list">
                        {linksList.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div> : <></> }
            </div> 
            : 
            <></> }
        </div>
    )
}

export default InviteLinkPopup
