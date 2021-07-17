import React, { useEffect, useReducer } from 'react';
import faunadb from 'faunadb';
import NavBar from './navbar';
import Intro from './intro';
import Problem from './problem';
import Summary from './summary';
import Version from './version';

const App = () => {
  const levels = [
    { id: 1, title: "Level 1", desc: "Minus under 20", total: 30 },
    { id: 2, title: "Level 2", desc: "Minus under 100", total: 30 },
    { id: 3, title: "Level 3", desc: "Minus under 100 with borrow", total: 10 },
    { id: 4, title: "Level 4", desc: "Minus under 100 with borrow mixed", total: 10 },
    { id: 5, title: "Level 5", desc: "Minus under 1000", total: 10 },
    { id: 6, title: "Level 6", desc: "Multiply under 9", total: 20},
  ];

  const initShared = {
    level: levels[0],
    right: 0,
    wrong: 0,
    end: null,
    begin: null,
    wrong_questions: []
  };

  const [shared, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'setLevel':
        return { ...initShared, level: action.level }
      case 'begin':
        return { ...state, begin: Date.now() };
      case 'end':
        const q = faunadb.query;
        const client = new faunadb.Client({ secret: 'fnADzi7APHACDAYFfcN6AF0KGb4nDC4VUecbTZRD' });
        client.query(
          q.Create(
            q.Collection('logs'),
            { data:  {level: state.level.id, right: state.right, wrong:state.wrong, wrong_questions: state.wrong_questions }}
          )
        )
        return { ...state, end: Date.now() };
      case 'answer':
        if (action.isRight)
          return { ...state, right: state.right + 1 };
        else
          return { ...state, wrong: state.wrong + 1, wrong_questions: state.wrong_questions.concat(action.wrong) };
      default:
        throw new Error(action.type + "has not found");
    }
  }, initShared);

  useEffect(() => {
    if (shared.right + shared.wrong >= shared.level.total) {
      dispatch({ type: 'end' });
    }
  }, [shared.right, shared.wrong, shared.level.total]);

  const onSetLevel = (i) => {
    dispatch({ type: 'setLevel', level: i });
  }

  return (
    <div className="App">
      <NavBar shared={shared} levels={levels} onSetLevel={onSetLevel} />
      <main className="container">
        <div className="bg-secondary p-5 rounded">
        {(shared.begin == null) &&
          <Intro shared={shared} levels={levels} onStart={() => dispatch({ type: 'begin' })} />
        }

        {(shared.begin && shared.end == null) && <Problem shared={shared} onAnswer={(isRight, wrong) => dispatch({ type: 'answer', isRight: isRight, wrong: wrong })} />}

        {(shared.end) && <Summary shared={shared} levels={levels} />}
        </div>
      </main>
      <div className="fixed-bottom text-right text-muted"><Version /></div>
    </div>
  );
}

export default App;
