import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserEmail, setUserID, setUserName, setUserProfileurl, setUserSocket } from '../data/actions/userActions';
import { io } from 'socket.io-client';
import { addUser, initUsers, deleteUser} from '../data/actions/usersListActions';
import { setCaller } from '../data/actions/callerActions';
import { addChat } from '../data/actions/chatActions';
import { setCurrSelected } from '../data/actions/currSelectedActions';
import { initRooms, addRoom, addUserToRoom, addRoomToJoined } from '../data/actions/roomsActions';
import { CHAT } from "../constants";
import { setClass } from '../data/actions/classReducerActions';
import { setCallJoin,setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../data/actions/callActions';
import { setWindowState } from '../data/actions/windowStateActions';

export let streamRef;

const Teams = () => {
    
    let socket;

    const socketRef = useRef();

    const dispatch = useDispatch();

    streamRef = useRef();

    useEffect(() => {
        socket = io(`http://localhost:5000`);
        socketRef.current = socket;      
        dispatch(setUserSocket(socketRef));
    }, []);

    useEffect(() => {

        socket.on('myid', (id) => {
            console.log(id);
            dispatch(setUserName(`Guest_${socket.id}`));
            dispatch(setUserID(socket.id));
            socket.emit('addUser', {name: `Guest_${socket.id}`, id: socket.id})
        });

        socket.on('initUsers', (obj) => {
            dispatch(initUsers(obj));
        });

        socket.on('addUser', (obj) => {
            dispatch(addUser(obj, false));
        });

        socket.on('deleteUser', (id) => {
            dispatch(deleteUser(id));
        });

        socket.on("receiveCall", ({from, signal}) => {
            dispatch(setCaller({is: false, from: from, to: socket.id, signal: signal}));
            dispatch(setCallReceive(true));
        });

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
            alert("call ended");
        });

        socket.on("receiveMessage", ({from, message}) => {
            dispatch(addChat("oto", from, from, message));
        });

        socket.on("receiveMessageToRoom", ({from, message, roomName}) => {
            if(from !== socket.id)
            dispatch(addChat("room", roomName, from, message));
        });

        socket.on("roomJoined", (roomName)=>{
            dispatch(addRoomToJoined(roomName));
        });

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

        socket.on('initRooms', (roomsObj) => {
            dispatch(initRooms(roomsObj));
        });

        socket.on("addRoom", room => {
            dispatch(addRoom(room));
        });

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