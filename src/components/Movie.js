import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      <span>{this.props.movieName}</span>
      <button onClick={(e)=>{this.props.handleVote(1, this.props.index, e)}} className="glyphicon glyphicon-plus"></button>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.index, e)}} className="glyphicon glyphicon-minus"></button>
      <button onClick={(e)=>{this.props.deleteMovie(this.props.index, e)}} className="glyphicon glyphicon-remove"></button>
      <span>{this.props.movies[this.props.index].votes}</span>
      </li>
    );
  }
}

export default Movie;
