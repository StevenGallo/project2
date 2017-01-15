import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  render() {
    return (
      <ul className="list-unstyled center-block list-group">
      {this.props.movies.map((movie,index) => {
        return<Movie key={index} movie={movie}/>})}
        </ul>
    );
  }
}

export default MovieList;
