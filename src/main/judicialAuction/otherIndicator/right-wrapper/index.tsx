import React from "react";
import RightOne from './right-one';
import RightTwo from './right-two';
import RightThree from './right-three';
import './style.scss';

function RightWrapper() {
    return (
        <div className="right-wrapper">
            <RightOne />
            <RightTwo />
            <RightThree />
        </div>
    )
}

export default RightWrapper