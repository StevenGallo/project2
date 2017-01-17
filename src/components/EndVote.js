import React, { Component } from 'react';

class EndVote extends Component {
  render() {
    if(this.props.winner){
      return (
        <div>the winner is {this.props.winner.movieName} with {this.props.winner.votes} votes</div>
        )
    }else{
    return (
      <button onClick={(e)=>{this.props.checkWinner(e)}} className="btn-primary">End Voting</button>
    );}
  }
}

export default EndVote;
