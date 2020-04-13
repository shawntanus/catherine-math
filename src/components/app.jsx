import React, { Component } from 'react';
import NavBar from './navbar';
import Intro from './intro';
import Problem from './problem';
import Summary from './summary';

class App extends Component {
  state = {
    levels: [
        {id: 1, title: "Level 1", desc: "Minus under 20", total: 30},
        {id: 2, title: "Level 2", desc: "Minus under 100", total: 30},
        {id: 3, title: "Level 3", desc: "Minus under 100 with borrow", total: 10},
        {id: 4, title: "Level 4", desc: "Minus under 100 with borrow mixed", total: 10},
    ],
    shared: {
      level: {},
      right: 0,
      wrong: 0,
      end: null,
      begin: null,
      wrong_questions: []
    },
    currentComponent: 0,
  }

  componentDidMount(){
    const state = this.initState();
    this.setState(state);
  }

  initState(){
    return {shared: {
      level: this.state.levels[0],
      right: 0,
      wrong: 0,
      end: null,
      begin: null,
      wrong_questions: []
    },currentComponent: 0};
  }

  render(){
    return (
        <div className="App">
        <NavBar shared={this.state.shared} levels={this.state.levels} onSetLevel={this.onSetLevel}/>
        <div className="container">
          {this.getComponent()}
        </div>
        </div>
    );
  }

  onAnswer = (right, wrong) => {
    const shared = this.state.shared;
    if(right){
      shared.right++;
    }else{
      shared.wrong_questions.push(wrong);
      shared.wrong++;
    }
    this.setState({shared});

  }

  onSetLevel = (i) => {
    const state = this.initState();
    state.shared.level = i;
    this.setState(state);
  }

  onNext = () => {
    const shared = this.state.shared;
    if(this.state.currentComponent === 0){
      shared.begin = new Date();
    }else if(this.state.currentComponent === 1){
      shared.end = new Date();
    }
    this.setState({shared: shared, currentComponent: this.state.currentComponent+1});
  }

  getComponent(){
    let component;
    switch (this.state.currentComponent){
      case 0 :
      default:
        component = <Intro shared={this.state.shared} levels={this.state.levels} onNext={this.onNext}/>;
        break;
      case 1:
        component = <Problem shared={this.state.shared} onNext={this.onNext} onAnswer={this.onAnswer} />;
        break;
      case 2:
        component = <Summary shared={this.state.shared} levels={this.state.levels} />;
        break;
    }
    return component;
  }
}

export default App;
