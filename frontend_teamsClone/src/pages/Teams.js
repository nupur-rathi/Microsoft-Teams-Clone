import React, { useRef, useEffect } from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import { useDispatch } from 'react-redux';
import { setUser, setUserEmail, setUserID, setUserName, setUserProfileurl, setUserSocket } from '../data/actions/userActions';
import { io } from 'socket.io-client';
import { addUser, initUsers, deleteUser} from '../data/actions/usersListActions';

const socket = io(`http://localhost:5000`);

const Teams = () => {
    
    const socketRef = useRef(socket);

    const dispatch = useDispatch();
    let user;

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
 
    }, []);

    return (
        <>
            <Header />
            <Body />
        </>
    );
}

export default Teams;