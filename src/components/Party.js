import React, { Component } from 'react';
import axios from 'axios';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import EndVote from './EndVote';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      movies:[],
      movie:{},
      addMovie:true,
      error:'',
      votes:0,
      winner:null,
      }
      this.addMovieTitle=this.addMovieTitle.bind(this);
      this.handleVote=this.handleVote.bind(this);
      this.checkWinner=this.checkWinner.bind(this);
      this.deleteMovie=this.deleteMovie.bind(this);
  }
  componentDidMount(){
    this.getMovies()
  }
  getMovies(){
    console.log(this.props.partyKey)
    axios({
      url: `${this.props.partyKey}.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "GET"
    }).then((response) => {
      console.log(response.data.movies)
      let movies=response.data.movies;
      movies.sort((a,b) => { return b.votes - a.votes })
      this.setState({ movies })
    }).catch((error) => {
      console.log(error);
    });
  }
  checkMovies(){
    let used=false
    if(this.state.movies){
    this.state.movies.map((movie)=>{
      if(movie===this.state.name){
        used=true
      }})}
    return used
  }
  addMovieTitle(){
    if(this.state.addMovie&&this.state.addMovie){
      return (<form onSubmit={(e)=>this.handleMovieAdd(e)}>
        <div className="form-group">
        <input className="form-control" type="text" autoFocus={true} value={this.state.name} required={true} onChange={(e)=>{this.setState({name:e.target.value,})}} />
        </div>
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  addMovie(){
    let movies=this.state.movies || []
    let movieName=this.state.name
    let movie=this.state.movie
    let votes=this.state.votes
    movie={movieName:movieName, votes:votes}
      movies.push(movie)
      movies.sort((a,b) => { return b.votes - a.votes })
      this.setState({ movies })
    axios({
      url: `${this.props.partyKey}/.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "PATCH",
      data: {movies}
    }).then((response) => {
      console.log(response)
      let movies=response.data.movies;
      this.setState({ movies, name:'' })
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
  checkWinner(event){
    event.preventDefault()
    let voteArr
    voteArr=this.state.movies.map((movie,index)=>{return movie.votes})
    let winnerIndex=voteArr.indexOf(Math.max(...voteArr))
    console.log(winnerIndex)
    let winner=this.state.movies[winnerIndex]
    let checkArr=voteArr.splice(winnerIndex,1)
    console.log(checkArr)
    console.log(voteArr)
    let checkerIndex=voteArr.indexOf(Math.max(...voteArr))
    console.log(checkerIndex)
    if(voteArr[checkerIndex]===checkArr[0]){
      alert("tie! keep voting")
    }else{
    this.setState({ winner, addMovie:false })
    }
  }
  handleVote(vote,index,event){
    event.preventDefault()
    console.log(index)
    let votes=this.state.movies[index].votes
    console.log(votes)
    votes+=vote
    this.setState({votes})
    console.log(votes)
    axios({
      url: `${this.props.partyKey}/movies/${index}/.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "PATCH",
      data: {votes}
    }).then((response) => {
      console.log(response)
      this.getMovies()
      }).catch((error) => {
        console.log(error);
      });
  }
  deleteMovie(index,event){
    event.preventDefault()
    let movies=this.state.movies
      movies.splice(index,1)
    axios({
      url: `${this.props.partyKey}/movies/${index}/.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "DELETE",
    }).then((response) => {
      this.setState({movies})
      }).catch((error) => {
        console.log(error);
      });
    axios({
      url: `${this.props.partyKey}/.json`,
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "PATCH",
      data: {movies}
    }).then((response) => {
    console.log(response)
    }).catch((error) => {
      console.log(error);
    });

  }
  checkDetails()
  {if(this.props.editDetails){
    return(
      <div className="container">
      <div className="jumbotron">
      <p>Place: {this.props.party[this.props.partyKey].partyDetails.place}</p>
      <p>Date: {this.props.party[this.props.partyKey].partyDetails.date}</p>
      <p>Time: {this.props.party[this.props.partyKey].partyDetails.time}</p>
       <button onClick={()=>{this.props.editDetails()}} className="btn-primary">Edit</button>
       </div>
       </div>)
      }else{
        return <div/>
      }}
  render() {
    return (
      <div>
      {this.checkDetails()}
      <AddMovie
      addMovieTitle={this.addMovieTitle}
      error={this.state.error}
      />
      <MovieList
      addMovie={this.state.addMovie}
      movies={this.state.movies}
      handleVote={this.handleVote}
      deleteMovie={this.deleteMovie}
      />
      <EndVote
      checkWinner={this.checkWinner}
      winner={this.state.winner}
      />
      </div>
    );
  }
}

export default Party;
