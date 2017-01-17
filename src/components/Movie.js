import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      {this.props.movieName}
      <button onClick={(e)=>{this.props.handleVote(1, this.props.index, e)}} className="glyphicon glyphicon-plus"></button>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.index, e)}} className="glyphicon glyphicon-plus"></button>
      <button onClick={(e)=>{this.props.deleteMovie(this.props.index, e)}} className="glyphicon glyphicon-remove"></button>
      {this.props.movies[this.props.index].votes}
      </li>
    );
  }
}

export default Movie;
