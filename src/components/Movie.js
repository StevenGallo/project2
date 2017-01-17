import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      {this.props.movie}
      <button onClick={(e)=>{this.props.handleVote(1, this.props.index, e)}} className="btn-primary">up</button>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.index, e)}} className="btn-primary">down</button>
      {this.props.movies[this.props.index].votes}
      </li>
    );
  }
}

export default Movie;
