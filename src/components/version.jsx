import React from 'react';
import preval from 'preval.macro'

const buildTimestamp = preval`module.exports = Date.now()`;

const buildVersion = () => {
    const buildDate = new Date(buildTimestamp);
    const formattedDate = `0.${buildDate.getMonth()+1}.${buildDate.getDate()}`
    return formattedDate;
}

const version = (props) => {
    return (
        <small>Version: {buildVersion()}</small>
    )
}

export default version;