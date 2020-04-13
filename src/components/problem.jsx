import React, { Component } from 'react';
import problemGenerator from './problem_generator.js';
import soundClick from './click.mp3';
import soundBounce from './bounce.mp3';

class Problem extends Component {
    state = {
        question: "",
        answer: 0,
        input: "",
    };

    audioClick = new Audio(soundClick);
    audioBounce = new Audio(soundBounce);

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    render() { 
        return(
            <div className="jumbotron">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text">{this.state.question} = </span>
                </div>
                <input type="number" className="form-control" placeholder="Answer here" value={this.state.input} onChange={this.handleChange} autoFocus/>
              </div>
            </form> 
          </div>
        );
    }

    componentDidMount(){
        let q = this.newQuestion();
        this.setState({question: q.question, answer: q.answer});
    }

    newQuestion(){
        let q;
        switch(this.props.shared.level.id){
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

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.input === "")
            return false;
            
        if(Number(this.state.input) === this.state.answer){
            this.audioBounce.play();
            this.props.onAnswer(true);
        }else{
            this.audioClick.play();
            var wrong = this.state.question + " = " + this.state.input;
            this.props.onAnswer(false, wrong);
            console.log(wrong);
        }

        if(this.props.shared.right + this.props.shared.wrong < this.props.shared.level.total){
            var q;
            do{
                q = this.newQuestion();
            }while(this.question === q.question);
            
            this.setState({question: q.question, answer: q.answer, input: ""});
        }else{
            this.props.onNext();
        }
        
        return false;
    }

    handleChange(event) {
        this.setState({input: event.target.value});
    }

}
 
export default Problem;