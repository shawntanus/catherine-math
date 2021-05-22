import React, { useState, useEffect, useCallback } from 'react';
import problemGenerator from './problem_generator.js';
import soundClick from './click.mp3';
import soundBounce from './bounce.mp3';

const Problem = (props) => {
    const [problem, setProblem] = useState({question: "", answer:0});
    const [input, setInput] = useState("");
    const audioClick = new Audio(soundClick);
    const audioBounce = new Audio(soundBounce);

    const generator = useCallback(() => {
        let func = problemGenerator["g" + props.shared.level.id];
        if(typeof func === "function")
            return func();
        else
            throw new Error("Cannot find problem_generator: " + props.shared.level.id);
    }, [props.shared.level.id]);

    useEffect(() => {
        var q;
        do {
            q = generator();
        } while (problem.question === q.question);

        setProblem(q);
        setInput("");
    }, [props.shared.right, props.shared.wrong, generator]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (Number(input) === problem.answer) {
            audioBounce.play();
            props.onAnswer(true);
        } else {
            audioClick.play();
            var wrong = problem.question + " = " + input;
            props.onAnswer(false, wrong);
            console.log(wrong);
        }
        return false;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group input-group-lg">
                <span className="input-group-text">{problem.question} = </span>
                <input type="number" className="form-control" placeholder="Answer here" value={input} onChange={e => setInput(e.target.value)} autoFocus required />
            </div>
        </form>
    );
}


export default Problem;