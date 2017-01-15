import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>{this.props.movie}</li>
    );
  }
}

export default Movie;
