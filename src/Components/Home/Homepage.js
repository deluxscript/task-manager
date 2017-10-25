import React from 'react';
import '../../css/App.css';
class Homepage extends React.Component {

    goToApp(event) {
        console.log('You clicked submit');
        //Get the value of the inpu field
        const managerId = this.managerInput.value;
        //Get and change the url
        this.context.router.transitionTo(`/app/${managerId}`);
    }
	render(){
        return(
			<div className="main">
                <div className="main-content">
                    <form className="FormContent" onSubmit={(e) => this.goToApp(e)}>
                        <h1 className="white">Get your task under control</h1>
                        <h4 className="white subext">with this task management tool</h4>
                        <input type="text" required placeholder="Custom name" ref={(input) => {this.managerInput = input}} />
                        <button type="submit">Create Now</button>
                    </form>
                </div>
            </div>
		)
	}
}

Homepage.contextTypes = {
	router: React.PropTypes.object
}

export default Homepage;