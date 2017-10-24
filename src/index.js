import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
//import registerServiceWorker from './registerServiceWorker';

import App from './Components/App';
import Homepage from './Components/Home/Homepage';

import './css/index.css';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={Homepage} />
				{/*<Match pattern="/store/:storeId" component={App} />*/}
				{/*<Miss component={ErrorPage} />*/}
			</div>
		</BrowserRouter>
	)
}

render(<Root/>, document.querySelector('#root'));
//registerServiceWorker();
