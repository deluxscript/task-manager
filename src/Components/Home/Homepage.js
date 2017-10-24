import React from 'react';

class Homepage extends React.Component {

    goToApp(e) {
        console.log('You clicked submit');
        //Get the value of the inpu field
        const managerId = this.managerInput.value;
        //Get and change the url
        this.context.router.transitionTo(`/${managerId}`);
    }
	render(){
        return(
			<div className="main">
                <div className="main-content">
                    <form className="FormContent" onSubmit={(e) => this.goToApp(e)}>
                        <h1 className="white">Create your own manager</h1>
                        <input type="text" required placeholder="Name of your manager" ref={(input) => {this.managerInput = input}} />
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