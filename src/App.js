import React, { Component } from 'react';
import Header from './components/Header';
import Party from './components/Party';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =
    { newParty: false,
      joinParty: false,
      newDetails: false,
      key: '',
      parties: {},
      party: {},
      place:'',
      time:'',
      date:'',
      partyName:'',
      error: '',
      partyTime: false
     };
     this.details=this.details.bind(this);
     this.editDetails=this.editDetails.bind(this);
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
    let newParty = {partyName:this.state.partyName, partyDetails:{place:this.state.place, time:this.state.time, date:this.state.date}}
    axios({
      url: '.json',
      baseURL: 'https://netflix-party.firebaseio.com/',
      method: "POST",
      data: newParty
    }).then((response) => {
      console.log(response.data.name)
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
      <input className="btn-primary" type="submit" value="Party Name" />
    </form>)
    }
  }
  newParty(){
    if(this.state.newParty&&this.state.newDetails===false){
    return (<form onSubmit={(e)=>this.handleCreateParty(e)}>
        <input type="text" autoFocus={true} value={this.state.partyName} required={true} onChange={(e)=>{this.setState({partyName:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Party Name" />
    </form>)
    }
  }
  chooseParty(){
    if(this.state.newParty===false&&this.state.joinParty===false){
    return (<div>
      <button onClick={()=>{this.setState({ newParty:true })}} className="btn-primary">New Party</button>
      <button onClick={()=>{this.setState({ joinParty:true })}} className="btn-primary">Join Party</button>
    </div>)
    }
  }
  details(){
    if(this.state.newDetails){
      return(<form onSubmit={(e)=>this.handleDetails(e)}>
        <input type="text" autoFocus={true} value={this.state.place} required={true} onChange={(e)=>{this.setState({place:e.target.value,})}} />
        <input type="text" value={this.state.time} required={true} onChange={(e)=>{this.setState({time:e.target.value,})}} />
        <input type="text" value={this.state.date} required={true} onChange={(e)=>{this.setState({date:e.target.value,})}} />
      <input className="btn-primary" type="submit" value="Set Details" />
    </form>)
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
      this.setState({newDetails:true})
      this.getParty()
    }
  }
  handleDetails(event){
    event.preventDefault()
    this.createParty()
  }
  checkName(){
    let found=false
    console.log(this.state.parties)
    for (const key in this.state.parties){
      console.log(`${key} + ${this.state.parties[key].partyName}`)
      if(this.state.partyName===this.state.parties[key].partyName){
        let party=this.state.party;
        party[key]=this.state.parties[key]
        this.setState({party, key:key})
        found=true
      }
    }
    return found
  }
  getParty(){
    this.setState({partyTime:true})
  }
  editDetails(){
    this.setState({newDetails:true})
  }
  render() {
    if(this.state.partyTime&&this.state.key){
      return(
        <div>
        {this.details()}
        <Party
        partyName={this.state.partyName}
        parties={this.state.parties}
        party={this.state.party}
        partyKey={this.state.key}
        editDetails={this.editDetails}
        newDetails={this.state.newDetails}
        />
        </div>)
    }else{
    return (
      <div className="App">
      {this.chooseParty()}
      {this.newParty()}
      {this.details()}
      {this.joinParty()}
      <p>{this.state.error}</p>
      </div>
    );
    }
  }
}

export default App;
