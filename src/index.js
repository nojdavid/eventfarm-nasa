import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import configureStore from './store';

import './styles/main.scss';

import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root')
);

// Service worker is front end chaching system to allow
// for fast delivery system of static css, images, etc.
// Not wanted for this project
serviceWorker.unregister();
