import React, { useState, useEffect } from 'react';
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
    const [shared, setShared] = useState({
      level: levels[0],
      right: 0,
      wrong: 0,
      end: null,
      begin: null,
      wrong_questions: []
    });
    
    useEffect(()=>{
      if(shared.right+shared.wrong>=shared.level.total){
        setShared({...shared, end: new Date()});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[shared.right, shared.wrong]);

    const onAnswer = (isRight, wrong) => {
      if(isRight){
        setShared({...shared, right: shared.right+1});
      }else{
        setShared({...shared, wrong: shared.wrong+1, wrong_questions: shared.wrong_questions.concat(wrong) });
      }
    }

    const onSetLevel = (i) => {
      setShared({...shared, level: i, right:0, wrong:0, begin: null, end: null, wrong_questions: []});
    }
  
    return (
      <div className="App">
        <NavBar shared={shared} levels={levels} onSetLevel={onSetLevel}/>
        <div className="container">
          {(shared.begin==null) && 
          <Intro shared={shared} levels={levels} onStart={()=>setShared({...shared, begin: new Date()})}/>}

           {(shared.begin && shared.end == null) && <Problem shared={shared} onAnswer={onAnswer} /> }

           {(shared.end) && <Summary shared={shared} levels={levels} />}
        </div>
      </div>
  );
}

export default App;
