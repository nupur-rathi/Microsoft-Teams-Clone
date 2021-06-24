import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserEmail, setUserID, setUserName, setUserProfileurl, setUserSocket } from '../data/actions/userActions';
import { io } from 'socket.io-client';
import { addUser, initUsers, deleteUser} from '../data/actions/usersListActions';
import { setCaller } from '../data/actions/callActions';
import { addChat } from '../data/actions/chatActions';
import { setCurrSelected } from '../data/actions/currSelectedActions';
import { initRooms, addRoom, addUserToRoom, addRoomToJoined } from '../data/actions/roomsActions';

const socket = io(`http://localhost:5000`);

const Teams = () => {
    
    const socketRef = useRef(socket);

    const dispatch = useDispatch();

    dispatch(setUser("Nupur Rathi", "", "", "#", socketRef));

    useEffect(() => {

        socket.on('myid', (id) => {
            dispatch(setUserName(id));
            dispatch(setUserID(id));
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

        socket.on("calluser", ({from, signal}) => {
            dispatch(setCaller({is: false, name: from, id: from, signal: signal}));
        });

        socket.on("receiveMessage", ({from, message}) => {
            dispatch(addChat("oto", from, from, message));
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