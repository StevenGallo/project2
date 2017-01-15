import React, { Component } from 'react';

class AddMovie extends Component {
  render() {
    return (
      <div>
        {this.props.addMovieTitle()}
        {this.props.error}
      </div>
    );
  }
}

export default AddMovie;
