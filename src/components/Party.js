import React, { Component } from 'react';
import axios from 'axios';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      movies:[],
      addMovie:true,
    }
  }
  componentDidMount(){
    this.getMovies()
  }
  getMovies(){
    axios({
      url: `${this.props.partyKey}.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "GET"
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    });
  }
  addMovieTitle(){
    if(this.state.addMovie){
      return (<form onSubmit={(e)=>this.handleMovieAdd(e)}>
        <input type="text" autoFocus={true} value={this.state.name} required={true} onChange={(e)=>{this.setState({name:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  addMovie(){
    axios({
      url: `${this.props.partyKey}.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "PATCH",
      data: { movies: this.state.movies}
    }).then((response) => {
      console.log(response)
      let movies=this.state.movies
      movies.push(this.state.name)
      this.setState({ movies, addMovie:false })
      }).catch((error) => {
        console.log(error);
      });
  }
  handleMovieAdd(event){
    event.preventDefault()
    this.addMovie()
  }
  render() {
    return (
      <div>
      {this.addMovieTitle()}
        <ul className="list-unstyled center-block list-group">
      {this.state.movies.map((movie,index) => {
        return<li key={index}>{movie}</li>})}
        </ul>
      </div>
    );
  }
}

export default Party;
