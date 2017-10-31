import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
//import registerServiceWorker from './registerServiceWorker';

import App from './Components/App';
import Homepage from './Components/Home/Homepage';
import Errorpage from './Components/Errorpage';

import './css/index.css';

const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
	return (
		<BrowserRouter basename={repo}>
			<div>
				<Match exactly pattern="/" component={Homepage} />
				<Match pattern="/app/:managerId" component={App} />
				<Miss component={Errorpage} />
			</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#root'));
