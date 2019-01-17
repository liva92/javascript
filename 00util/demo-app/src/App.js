import React, { Component } from 'react';
import './App.css';
import _mm from './public/common.js';

class App extends Component {

  componentDidMount(){
    var pos = {};
    var boxEle = this.refs.box;
     pos = _mm.getposition(boxEle);
     console.log(pos);
  };

  render() {
    return (
      <div className="App" ref="box">
        111111111111111111111111
        111111111111111111111111
        111111111111111111111111
        111111111111111111111111
        111111111111111111111111
        111111111111111111111111
        111111111111111111111111
      </div>
    )
  }
}

export default App;
