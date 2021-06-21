import React,  { useState } from 'react';
import '../../styles/mainBody.css';
import MainBodyContainer from './MainBodyContainer';
import MainBodyHeader from './MainBodyHeader';
import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';
import { useSelector } from 'react-redux';

const MainBody = () => {

    const classState = useSelector(state => state.classReducer);

    const [currentWindow, setCurrentWindow] = useState(CHAT);


    const setWindowState = (type) => {
        setCurrentWindow(type);
    };

    return (
        <div className={classState ? "mainBody mainBody_expand": "mainBody"}>
            <MainBodyHeader currentWindow={currentWindow} setWindowState={setWindowState}/>
            <MainBodyContainer currentWindow={currentWindow} setWindowState={setWindowState}/>
        </div>
    );
}

export default MainBody;