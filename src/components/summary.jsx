import React, { Component } from 'react';

class Summary extends Component {

    render() { 
        const red = {color: "red"};

        return(
            <div className="jumbotron">
            <div><h1>Level: { this.props.shared.level.id }</h1></div>
            <div><h1>Right: { this.props.shared.right }</h1></div>
            <div><h1>Wrong: { this.props.shared.wrong }</h1></div>
            <div><h1>Time: { this.formatTimer() }</h1></div>
            {this.props.shared.wrong_questions.length >0 &&
                <div><h1>Wrong answers:</h1><ul>
                    {this.props.shared.wrong_questions.map((question,index) => (
                        <li key={index}><h2 style={red}>{question}</h2></li>
                    ))}
                </ul></div>
            }
          </div>
        );
    }

    formatTimer(){
        var t = this.props.shared.end - this.props.shared.begin; 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        return minutes + " minutes " + seconds + " seconds";
    }
}
 
export default Summary;