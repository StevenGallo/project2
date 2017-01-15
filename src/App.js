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
      error: '',
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
  createParty() {
    let newParty = {partyName:this.state.partyName, movies: this.state.movies}
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
    return (<form onSubmit={(e)=>this.handleGetParty(e)}>
        <input type="text" autoFocus={true} value={this.state.partyName} required={true} onChange={(e)=>{this.setState({partyName:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Submit" />
    </form>)
    }
  }
  newParty(){
    if(this.state.newParty){
    return (<form onSubmit={(e)=>this.handleCreateParty(e)}>
        <input type="text" autoFocus={true} value={this.state.partyName} required={true} onChange={(e)=>{this.setState({partyName:e.target.value,})}} />
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
  handleGetParty(event){
    event.preventDefault(event)
      if(this.checkName()){
        this.getParty()
      }else{
      this.setState({partyName: '',
       error:'That party does not exist. Please enter valid party name'})
    }
  }
  handleCreateParty(event){
  event.preventDefault()
  this.getParties()
    if(this.partyName!==true&&this.checkName()){
      this.setState({partyName: '',
       error:'That party name already exists. Please choose a new name'})
    }else{
      this.createParty()
    }
  }
  checkName(){
    this.getParties()
    let found=false
    console.log(this.state.parties)
    for (const key in this.state.parties){
      console.log(`${key} + ${this.state.parties[key].partyName}`)
      if(this.state.partyName===this.state.parties[key].partyName){
        console.log('found')
        found=true
      }
    }
    return found
  }
  getParty(){

  }
  render() {
    return (
      <div className="App">
      {this.chooseParty()}
      {this.newParty()}
      {this.joinParty()}
      <p>{this.state.error}</p>
      <AddMovie />
      <MovieList />
      <Party />
      </div>
    );
  }
}

export default App;
