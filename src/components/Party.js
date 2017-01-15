import React, { Component } from 'react';
import axios from 'axios';
import AddMovie from './AddMovie';
import MovieList from './MovieList';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      movies:[],
      addMovie:true,
      error:'',
      }
      this.addMovieTitle=this.addMovieTitle.bind(this)
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
      console.log(response.data)
      let movies=response.data.movies
      this.setState({movies})
    }).catch((error) => {
      console.log(error);
    });
  }
  checkMovies(){
    let used=false
    this.state.movies.map((movie)=>{
      if(movie===this.state.name){
        used=true
      }})
    return used
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
    let movies=this.state.movies
      movies.push(this.state.name)
      this.setState({ addMovie:false })
    axios({
      url: `${this.props.partyKey}.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "PATCH",
      data: { movies }
    }).then((response) => {
      console.log(response)
      movies=response.data.movies
      this.setState({ movies})
      }).catch((error) => {
        console.log(error);
      });
  }
  handleMovieAdd(event){
    event.preventDefault()
    if(this.checkMovies()===false){
      this.addMovie()
    }else{
      this.setState({
        error: 'That movie is already on the list. Please choose a new movie',
        name:''
      })
    }
  }
  render() {
    return (
      <div className="App">
      <AddMovie
      addMovieTitle={this.addMovieTitle}
      error={this.state.error}
      />
      <MovieList
      movies={this.state.movies}
      />
      </div>
    );
  }
}

export default Party;
