import React, { Component } from 'react';

import Rover from './components/Rover';
import Drawer from './components/Drawer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
        	<div className='logo'/>
        	<h1>
        		Noah Davidson's Nasa Project
        	</h1>
        </header>
        <div className='content'>
	    		<Drawer />
	    		<Rover/>
	      </div>
      </div>
    );
  }
}

export default App;
