import React, { useState, useEffect } from 'react';
import problemGenerator from './problem_generator.js';
import soundClick from './click.mp3';
import soundBounce from './bounce.mp3';

const newQuestion = (id)=> {
    let q;
    switch(id){
        case 1:
        default:
            q = problemGenerator.problem_generator_1();
            break;
        case 2:
            q = problemGenerator.problem_generator_2();
            break;
        case 3:
            q = problemGenerator.problem_generator_3();
            break;
        case 4:
            q = problemGenerator.problem_generator_4();
            break;
    }
    return q;
}

const Problem = (props)=> {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState(0);
    const [input, setInput] = useState("");
    const audioClick = new Audio(soundClick);
    const audioBounce = new Audio(soundBounce);

    useEffect(() =>{
        var q;
        do{
            q = newQuestion(props.shared.level.id);
        }while(question === q.question);
        
        setQuestion(q.question);
        setAnswer(q.answer);
        setInput("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.shared.right, props.shared.wrong]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(Number(input) === answer){
            audioBounce.play();
            props.onAnswer(true);
        }else{
            audioClick.play();
            var wrong = question + " = " + input;
            props.onAnswer(false, wrong);
            console.log(wrong);
        }        
        return false;
    }

    return(
        <div className="jumbotron">
        <form onSubmit={handleSubmit}>
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text">{question} = </span>
            </div>
            <input type="number" className="form-control" placeholder="Answer here" value={input} onChange={e => setInput(e.target.value)} autoFocus required/>
          </div>
        </form> 
      </div>
    );
}

 
export default Problem;