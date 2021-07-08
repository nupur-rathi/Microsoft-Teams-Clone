import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserName, setUserSocket } from '../data/actions/userActions';
import { io } from 'socket.io-client';
import { addUser, initUsers, deleteUser} from '../data/actions/usersListActions';
import { setCaller } from '../data/actions/callerActions';
import { addChat } from '../data/actions/chatActions';
import { initRooms, addRoom, addUserToRoom, addRoomToJoined } from '../data/actions/roomsActions';
import { CHAT } from "../constants";
import { setClass } from '../data/actions/classReducerActions';
import { setCallJoin,setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../data/actions/callActions';
import { setWindowState } from '../data/actions/windowStateActions';

//reference to your mediaStream
export let streamRef;

const Teams = () => {
    
    let socket;

    //reference to your socket
    const socketRef = useRef();

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer);

    streamRef = useRef();

    //socket getting created whenever you direct to teams page
    useEffect(() => {
        socket = io(`http://localhost:5000`);
        socketRef.current = socket;      
        dispatch(setUserSocket(socketRef));
    }, []);

    useEffect(() => {

        //user info initialization when socket gets created
        socket.on('myid', (id) => {
            if(user.isGuest === true)
                dispatch(setUserName(`Guest_${socket.id}`));
            dispatch(setUserID(socket.id));
            if(user.isGuest === true)
                socket.emit('addUser', {name: `Guest_${socket.id}`, id: socket.id, email: user.email, imgUrl: user.profileUrl, isGuest: user.isGuest})
            else
                socket.emit('addUser', {name: user.name, id: socket.id, email: user.email, imgUrl: user.profileUrl, isGuest: user.isGuest});
        });

        //initializing list of online users
        socket.on('initUsers', (obj) => {
            dispatch(initUsers(obj));
        });

        //adding new user to usersList
        socket.on('addUser', (obj) => {
            dispatch(addUser(obj, false));
        });

        //deleting a user form usersList
        socket.on('deleteUser', (id) => {
            dispatch(deleteUser(id));
        });

        //receiving a call from some user
        socket.on("receiveCall", ({from, signal}) => {
            dispatch(setCaller({is: false, from: from, to: socket.id, signal: signal}));
            dispatch(setCallReceive(true));
            socket.emit("setBusy", true);
        });

        //if call gets ended before joining
        socket.on("callEndedBefore", () => {
            dispatch(setCallReceive(false));
            if(streamRef.current)
            streamRef.current.getTracks().forEach(track => track.stop());
            dispatch(setWindowState(CHAT));
            dispatch(setClass(false));
            dispatch(setCallJoin(false));
            dispatch(setCallAccept(false));
            dispatch(setCallDecline(false));
            dispatch(setCallReceive(false));
            dispatch(setCallEnd(false));
            dispatch(setCallSend(false));
            dispatch(setCallCancel(false));
            socket.emit("setBusy", false);
            alert("call ended");
        });

        //receiving a personal message from a user
        socket.on("receiveMessage", ({from, name, message}) => {
            dispatch(addChat("oto", from, from, name, message));
        });

        //receiving a message to a room
        socket.on("receiveMessageToRoom", ({from, name, message, roomName}) => {
            if(from !== socket.id)
            dispatch(addChat("room", roomName, from, name, message));
        });

        //on joining a room
        socket.on("roomJoined", (roomName)=>{
            dispatch(addRoomToJoined(roomName));
        });

        //to check if room already exists
        socket.on("roomExists", ()=>{
            alert("room name already exists");
        });

        socket.on("cannotJoin", ()=>{
            alert("cannot join this room.");
        });

        socket.on("alreadyJoined", ()=>{
            alert("room already joined.");
        });

        socket.on("wrongPassword", ()=>{
            alert("wrong password for this private room");
        });

        socket.on("notExists", ()=>{
            alert("room with this name does not exists.");
        });

        //initializing public rooms
        socket.on('initRooms', (roomsObj) => {
            dispatch(initRooms(roomsObj));
        });

        //adding a newly made room to list of rooms
        socket.on("addRoom", room => {
            dispatch(addRoom(room));
        });

        //adding user to a room in roomsList
        socket.on("addUserToRoom", ({userID, roomName}) => {
            dispatch(addUserToRoom(userID, roomName));
        });

    }, []);

    return (
        <>
            <Header />
            <Body />
        </>
    );
}

export default Teams;