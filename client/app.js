import React, { Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div> Hello </div>
    );
  }
}

render(<App />, document.getElementById('app'));
