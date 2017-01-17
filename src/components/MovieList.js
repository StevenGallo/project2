import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  render() {
    if(this.props.movies&&this.props.addMovie){
    return (
      <ul className="list-unstyled center-block list-group">
      {this.props.movies.map((movie,index) => {
        console.log(`${movie.movieName}+ ${index}`)
        return <Movie
        key={index}
        movie={movie}
        movieName={movie.movieName}
        movies={this.props.movies}
        index={index}
        handleVote={this.props.handleVote}
        deleteMovie={this.props.deleteMovie}
        />})}
        </ul>
    );
    }else{
      return (<div></div>)
    }
  }
}

export default MovieList;
