import React from 'react';

const formatTimer = (t)=> {
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
    var seconds = Math.floor((t % (1000 * 60)) / 1000); 
    return minutes + " minutes " + seconds + " seconds";
}

const Summary = (props)=> {
    const red = {color: "red"};
    return(
        <div className="jumbotron">
        <div><h1>Level: { props.shared.level.id }</h1></div>
        <div><h1>Right: { props.shared.right }</h1></div>
        <div><h1>Wrong: { props.shared.wrong }</h1></div>
        <div><h1>Time: { formatTimer(props.shared.end - props.shared.begin) }</h1></div>
        {props.shared.wrong_questions.length >0 &&
            <div><h1>Wrong answers:</h1><ul>
                {props.shared.wrong_questions.map((question,index) => (
                    <li key={index}><h2 style={red}>{question}</h2></li>
                ))}
            </ul></div>
        }
      </div>
    );
}

export default Summary;