import React, { useState, useEffect } from 'react';

const formatTimer = (timerInSeconds)=> {
  if (timerInSeconds === 0)
      return "--";
  var minutes = Math.floor((timerInSeconds % (1000 * 60 * 60)) / (1000 * 60)); 
  var seconds = Math.floor((timerInSeconds % (1000 * 60)) / 1000); 
  return minutes + " minutes " + seconds + " seconds";
}

const NavBar = (props)=> {
  const [timerInSeconds, setTimerInSeconds] = useState(0);

  useEffect(() =>{
    const interval = setInterval(() => {
          if(props.shared.end != null){
              setTimerInSeconds(props.shared.end - props.shared.begin);
            }else if(props.shared.begin != null){
              setTimerInSeconds(new Date().getTime() - props.shared.begin);
            }else{
              setTimerInSeconds(0);
            }
      },1000);
      return () => clearInterval(interval);
  }, [props.shared.end, props.shared.begin]);

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <button type="button" className="navbar-brand btn btn-link">Catherine Math Practice Project</button>
    <div className="navbar-collapse">
      <ul className="navbar-nav mr-auto">
        {props.levels.map((level,index)=>(
            <li className="nav-item" key={level.id}>
                <button
                    className={`btn btn-link nav-link ${props.shared.level===level && "active"}`} 
                    onClick={ ()=> props.onSetLevel(level)} >
                        {level.title}
                </button>
            </li>
        ))}
      </ul>

      <ul className="navbar-nav navbar-right">
        <li><button className="nav-link btn btn-link">Timer: { formatTimer(timerInSeconds) }</button></li>
        <li><button className="nav-link btn btn-link">Progress: { props.shared.right + props.shared.wrong }/{ props.shared.level.total || "-" }</button></li>
      </ul>
    </div>
  </nav>

  );
}
 
export default NavBar;