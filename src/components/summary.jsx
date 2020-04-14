import React from 'react';
import TimeFormatter from './timeformatter';

const Summary = (props) => {
    const red = { color: "red" };
    return (
        <div className="jumbotron">
            <div><h1>Level: {props.shared.level.id}</h1></div>
            <div><h1>Right: {props.shared.right}</h1></div>
            <div><h1>Wrong: {props.shared.wrong}</h1></div>
            <div><h1>Time: <TimeFormatter t={props.shared.end - props.shared.begin} /></h1></div>
            {props.shared.wrong_questions.length > 0 &&
                <div><h1>Wrong answers:</h1><ul>
                    {props.shared.wrong_questions.map((question, index) => (
                        <li key={index}><h2 style={red}>{question}</h2></li>
                    ))}
                </ul></div>
            }
        </div>
    );
}

export default Summary;