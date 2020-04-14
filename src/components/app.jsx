import React, { useState, useEffect, useReducer } from 'react';
import NavBar from './navbar';
import Intro from './intro';
import Problem from './problem';
import Summary from './summary';


const App = () => {
  const [levels] = useState([
    {id: 1, title: "Level 1", desc: "Minus under 20", total: 30},
    {id: 2, title: "Level 2", desc: "Minus under 100", total: 30},
    {id: 3, title: "Level 3", desc: "Minus under 100 with borrow", total: 10},
    {id: 4, title: "Level 4", desc: "Minus under 100 with borrow mixed", total: 10},
    ]);

  const initShared = {
    level: levels[0],
    right: 0,
    wrong: 0,
    end: null,
    begin: null,
    wrong_questions: []
  };

  const [shared, dispathShared] = useReducer((state, action)=>{
    switch (action.type) {
      case 'setLevel':
        return {...initShared, level:action.level}
      case 'begin':
        return {...state, begin: Date.now()};
      case 'end':
        return {...state, end: Date.now()};
      case 'answer':
        if(action.isRight)
          return {...state, right: state.right+1};
        else
          return {...state, wrong: state.wrong+1, wrong_questions: state.wrong_questions.concat(action.wrong)};
      default:
        throw new Error(action.type + "has not found");
    }
  }, initShared);
    
  useEffect(()=>{
    if(shared.right+shared.wrong>=shared.level.total){
      dispathShared({type: 'end'});
    }
  },[shared.right, shared.wrong, shared.level.total]);

  const onSetLevel = (i) => {
    dispathShared({type: 'setLevel', level: i});
  }

  return (
    <div className="App">
      <NavBar shared={shared} levels={levels} onSetLevel={onSetLevel}/>
      <div className="container">
        {(shared.begin==null) && 
          <Intro shared={shared} levels={levels} onStart={()=>dispathShared({type: 'begin'})}/>
        }

        {(shared.begin && shared.end == null) && <Problem shared={shared} onAnswer={(isRight, wrong)=> dispathShared({type:'answer', isRight: isRight, wrong: wrong})} /> }

        {(shared.end) && <Summary shared={shared} levels={levels} />}
      </div>
    </div>
  );
}

export default App;
