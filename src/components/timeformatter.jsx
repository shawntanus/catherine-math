import React from 'react';

const formattedTime = (timerInSeconds)=> {
    if (timerInSeconds === 0)
        return "--";
    var minutes = Math.floor((timerInSeconds % (1000 * 60 * 60)) / (1000 * 60)); 
    var seconds = Math.floor((timerInSeconds % (1000 * 60)) / 1000); 
    return minutes + " minutes " + seconds + " seconds";
}

const timeformatter = (props) => {
    return (
        <span>{formattedTime(props.t)}</span>
    )
}

export default timeformatter;