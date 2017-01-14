import React, { Component } from 'react';
import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';
import Header from './components/Header';
import Party from './components/Party';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state =
    { movies: [],
      newParty: false,
      joinParty: false,
      key: '',
      parties: {},
      party: {},
      partyName:'',
     };
  }
  componentDidMount(){
    this.getParties()
  }
  getParties(){
    axios({
      url: '.json',
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "GET"
    }).then((response) => {
      console.log(response)
      this.setState({ parties: response.data });
    }).catch((error) => {
      console.log(error);
    });
  }
  createParty(event) {
    let newParty = {partyName:this.state.partyName, movies: this.state.movies, newParty: true}
    event.preventDefault()
    axios({
      url: '.json',
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "POST",
      data: newParty
    }).then((response) => {
      console.log(response)
      let party = this.state.party;
      let partyId = response.data.name;
      party[partyId] = newParty;
      this.setState({ party, key: response.data.name});
    }).catch((error) => {
      console.log(error);
    });
  }
  joinParty(){
    if(this.state.joinParty){
    return (<form onSubmit={(e)=>this.getParty(e)}>
        <input type="text" onChange={(e)=>{this.setState({partyName:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  newParty(){
    if(this.state.newParty){
    return (<form onSubmit={(e)=>this.createParty(e)}>
        <input type="text" onChange={(e)=>{this.setState({partyName:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  chooseParty(){
    if(this.state.newParty===false&&this.state.joinParty==false){
    return (<div>
      <button onClick={()=>{this.setState({ newParty:true })}} className="btn-primary">New Party</button>
      <button onClick={()=>{this.setState({ joinParty:true })}} className="btn-primary">Join Party</button>
    </div>)
    }
  }
  getParty(event){
    event.preventDefault(event)
    this.getParties()
    console.log(this.state.parties)
    for (const key in this.state.parties){
      console.log(`${key} + ${this.state.parties[key].partyName}`)
      if(this.state.partyName===this.state.parties[key].partyName){
        console.log('found')
      }else{console.log('notFound')}
    }
  }
  render() {
    return (
      <div className="App">
      {this.chooseParty()}
      {this.newParty()}
      {this.joinParty()}
      </div>
    );
  }
}

export default App;
