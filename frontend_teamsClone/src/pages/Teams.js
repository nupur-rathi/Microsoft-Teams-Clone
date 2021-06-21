import React from 'react';
import Header from '../components/Header';
import Body from '../components/Body';
import { useDispatch } from 'react-redux';
import { setUser } from '../data/actions/userActions';


const Teams = () => {

    const dispatch = useDispatch();
    dispatch(setUser("Pupur Rathi", "nupur2218@gmail.com", "id", "../assets/girl1.jpg"));

    return (
        <>
            <Header />
            <Body />
        </>
    );
}

export default Teams;