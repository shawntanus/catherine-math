import React, { Component } from 'react';

class Intro extends Component {
    render() { 
        return(
            <div className="jumbotron">
            <h1>Minus Level { this.props.shared.level.id }</h1>
            <p>{ this.props.shared.level.desc }</p>
            <p>
              <button className="btn btn-lg btn-primary" onClick={() => this.props.onNext()}>Start &raquo;</button>
            </p>
          </div>

        );
    }
}
 
export default Intro;