import React from 'react';

const Intro = (props)=> {
  return (
    <div className="jumbotron">
      <h1>Minus Level {props.shared.level.id}</h1>
      <p>{props.shared.level.desc}</p>
      <p>
        <button className="btn btn-lg btn-primary" onClick={props.onStart}>Start &raquo;</button>
      </p>
    </div>

  );
}

export default Intro;