import React, { Component } from 'react';
import axios from 'axios';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      movies:[],
      addMovie:true,
      error:'',
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
      console.log(response.data)
      let movies=response.data.movies
      this.setState({movies})
    }).catch((error) => {
      console.log(error);
    });
  }
  checkMovies(){
    this.getMovies()
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
      {this.addMovieTitle()}
      {this.state.error}
        <ul className="list-unstyled center-block list-group">
      {this.state.movies.map((movie,index) => {
        return<li key={index}>{movie}</li>})}
        </ul>
      </div>
    );
  }
}

export default Party;
