import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
//import registerServiceWorker from './registerServiceWorker';

import App from './Components/App';
import Homepage from './Components/Home/Homepage';
import Errorpage from './Components/Errorpage';

import './css/index.css';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={Homepage} />
				<Match pattern="/app/:managerId" component={App} />
				<Miss component={Errorpage} />
			</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#root'));
//registerServiceWorker();
