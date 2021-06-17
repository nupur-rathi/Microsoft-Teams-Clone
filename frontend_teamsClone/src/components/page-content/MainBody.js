import React from 'react';
import '../../styles/mainBody.css';
import MainBodyContainer from './MainBodyContainer';
import MainBodyHeader from './MainBodyHeader';

const MainBody = () => {
    return (
        <div className="mainBody">
            <MainBodyHeader />
            <MainBodyContainer />
        </div>
    );
}

export default MainBody;