import React, { Component } from 'react';

class NavBar extends Component {
    state = {
        timerInSeconds: 0 
    };
    render() { 
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button type="button" className="navbar-brand btn btn-link">Catherine Math Practice Project</button>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto">
                {this.props.levels.map((level,index)=>(
                    <li className="nav-item" key={level.id}>
                        <button
                            className={`btn btn-link nav-link ${this.props.shared.level===level && "active"}`} 
                            onClick={ ()=> this.props.onSetLevel(level)} >
                                {level.title}
                        </button>
                    </li>
                ))}
              </ul>
      
              <ul className="navbar-nav navbar-right">
                <li><button className="nav-link btn btn-link">Timer: { this.formatTimer() }</button></li>
                <li><button className="nav-link btn btn-link">Progress: { this.props.shared.right + this.props.shared.wrong }/{ this.props.shared.level.total || "-" }</button></li>
              </ul>
            </div>
          </nav>

        );
    }

    componentDidMount(){
        this.timerID = setInterval(
            () =>{
                if(this.props.shared.end != null){
                    this.setState({timerInSeconds:this.props.shared.end - this.props.shared.begin });
                  }else if(this.props.shared.begin != null){
                    this.setState({timerInSeconds: new Date().getTime() - this.props.shared.begin});
                  }else{
                    this.setState({timerInSeconds: 0});
                  }
            },
            1000
        );
    }

    formatTimer(){
        const { timerInSeconds } = this.state;

        if (timerInSeconds === 0)
            return "--";
        var minutes = Math.floor((timerInSeconds % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((timerInSeconds % (1000 * 60)) / 1000); 
        return minutes + " minutes " + seconds + " seconds";
    }
}
 
export default NavBar;