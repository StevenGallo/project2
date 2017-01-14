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
      parties: {},
      party: {},
      partyName:'',
     };
  }
  componentDidMount(){
    axios({
      url: '.json',
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "GET"
    }).then((response) => {
      this.setState({ parties: response.data });
    }).catch((error) => {
      console.log(error);
    });
  }
  createParty(event) {
    let newParty = {partyName:this.state.partyName, movies: this.state.movies, newParty: this.state.newParty}
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
      this.setState({ party, newParty:false });
    }).catch((error) => {
      console.log(error);
    });
  }
  newParty(event){
    event.preventDefault()
    if(this.state.newParty){
      return (<form onSubmit={(e)=>this.createParty(e)}>
          <input type="text" defaultValue={this.props.newTweed}
          onChange={(e)=>{this.setState({partyName:e.target.value})}} />
        <input className="btn-primary" type="submit" value="Submit" />
      </form>)
    }
  }
  chooseParty(){
    return (<div>
      <button onClick={this.newParty(event)} className="btn-primary">New Party</button>
      <button className="btn-primary">Join Party</button>
    </div>)
  }
  render() {
    return (
      <div className="App">
      {this.chooseParty()}
      </div>
    );
  }
}

export default App;
