# project2

##Movie Party
![MovieNight](http://i.imgur.com/TZ58Fkt.png)
##Technologies Used
- React
- Bootstrap
- Javascript
- Axios
- Firebase

##Code Example
This is my code for the Movie component that renders the movie title and vote up/ down and delete buttons
```javascript
import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <li>
      <span>{this.props.movieName}</span>
      <div className="btn-group">
      <button onClick={(e)=>{this.props.handleVote(1, this.props.index, e)}} className="btn btn-primary">up</button>
      <button onClick={(e)=>{this.props.handleVote(-1, this.props.index, e)}} className="btn btn-primary">down</button>
      <button onClick={(e)=>{this.props.deleteMovie(this.props.index, e)}} className="btn btn-primary">delete</button>
      </div>
      <span>{this.props.movies[this.props.index].votes}</span>
      </li>
    );
  }
}

export default Movie;
```
##Build Strategy
I started by wireframing the App to determine the basic app layout and begin to determine which parts of the app would be
different components. I then started to determine the structure of the JSON object I would be posting/getting from the server
so I could access and change my data efficiently. I ended up adding more components and changed my JSON structure as I added functinality.

##Complications/Future Improvements
- improve styling
- add animations
- improve layout/ usability
- add party members
- add party admin functionality
- add routing

###Contributing
Joe Keohan

###Authors
Steven Gallo
