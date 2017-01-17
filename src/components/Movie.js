import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      {this.props.movieName}
      <button onClick={(e)=>{this.props.handleVote(1, this.props.index, e)}} className="btn-primary">up</button>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.index, e)}} className="btn-primary">down</button>
      <button onClick={(e)=>{this.props.deleteMovie(this.props.movie, this.props.index, e)}} className="btn-primary">delete</button>
      {this.props.movies[this.props.index].votes}
      </li>
    );
  }
}

export default Movie;
