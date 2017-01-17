import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      {this.props.movie}
      <button onClick={(e)=>{this.props.handleVote(1, this.props.movie, e)}} className="btn-primary" value="up"/>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.movie, e)}} className="btn-primary" value="down"/>
      </li>
    );
  }
}

export default Movie;
