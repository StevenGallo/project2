import React, { Component } from 'react';

class Party extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:'',
      movies:[],
      addMovie:true,
    }
  }
  addMovie(){
    if(this.props.partyTime&&this.state.addMovie){
      return (<form onSubmit={(e)=>this.handleMovieAdd(e)}>
        <input type="text" autoFocus={true} value={this.props.name} required={true} onChange={(e)=>{this.setState({name:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  handleMovieAdd(event){
    event.preventDefault()
    let movies=this.state.movies
    movies.push(this.state.name)
    this.setState({ movies, addMovie:false })
  }
  render() {
    return (
      <div>
      {this.addMovie()}
        <ul className="list-unstyled center-block list-group">
      {this.state.movies.map((movie,index) => {
        return<li>{movie}</li>})}
        </ul>
      </div>
    );
  }
}

export default Party;
