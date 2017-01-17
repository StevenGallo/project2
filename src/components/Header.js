import React, { Component } from 'react';

class Header extends Component {
  render(){
  let headerText
  if(this.props.partyName){
    headerText=`Welcome to ${this.props.partyName}'s movie Party`
  }else{
    headerText="join a Movie Party"
  }
  return(
  <div class="container">
  <div class="jumbotron">
  <h1>Movie Party</h1>
  <p>{headerText}</p>
  </div>
  </div>
)
}
}
export default Header;
