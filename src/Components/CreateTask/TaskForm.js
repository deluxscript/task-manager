import React from 'react';
import { Link } from 'react-router';
import AppBase from '../../appbase';

import '../../css/mainApp.css';

class TaskForm extends React.Component {

    constructor() {
        super();

        this.state = {
            uid: null,
            uniqueUser: null
        }
    }

    createTask = (event) => {
        event.preventDefault();
        console.log('You submitted your task');

        //Hold on to the field values.....
        const Task = {
            name: this.name.value,
            desc: this.desc.value,
            sDate: this.startDate.value,
            eDate: this.endDate.value,
            level: this.level.value,
        }
        console.log(Task);

        this.taskForm.reset();
        this.props.Tasklist(Task);
    };

    authenticate = (provider) => {
        AppBase.authWithOAuthPopup(provider, this.authHandler);
    };

    logout = () => {
        AppBase.unauth();
        this.setState({ uid: null });
    };

    authHandler = (err, authData) =>  {
        console.log(authData);
        if (err) {
            console.error(err);
            return;
        };
        // Get App Details
        const AppRef = AppBase.database().ref(this.props.managerId);

        // query the firebase once for the App data
        AppRef.once('value', (snapshot) => {
        const data = snapshot.val() || {};

        // Assign to the user if there is no owner
        if(!data.uniqueUser) {
            AppRef.set({
                uniqueUser: authData.user.uid
            });
        }

        this.setState({
                uid: authData.user.uid,
                uniqueUser: data.uniqueUser || authData.user.uid
            });
        });

    }

    renderLogin = () => {
        return (
        <div className="login">
            <h2>Welcome to your Task Manager APP</h2>
            <p>Kindly click <Link to='/'>here</Link> to create your own manager and manage your tasks</p>
            <p className="loginText">Sign in to create and manage your Tasks</p>
            <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
            <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
        </div>
        )
    };

    componentDidMount() {
        AppBase.onAuth((user) => {
        if(user) {
            this.authHandler(null, { user });
        }
        });
    }

    render() {
        
        const logout = <button onClick={this.logout} className="logout">Log Out</button>;

        // check if no user is logged in
        if(!this.state.uid) {
        return <div>{this.renderLogin()}</div>
        }

        // confirm they are the owner of the app
        if(this.state.uid !== this.state.uniqueUser) {
        return (
            <div>
            <p>Sorry you aren't the owner of this URL!</p>
            <p>Kindly click <Link to='/'>here</Link> to create your own manager and manage your tasks</p>
            {logout}
            </div>
        )
        }

        return (
            <div>
                {logout}
                <form ref={(input) => this.taskForm = input} className="createTask" onSubmit={(e) => this.createTask(e)}>
                    <div>
                        <label htmlFor="name">Name<br />
                            <input ref={(input) => this.name = input} type="text" className="formFields"/>
                        </label>
                    </div>
                    
                    <div>
                        <label htmlFor="desc">Description<br />
                            <textarea ref={(input) => this.desc = input} className="formFields" rows="7"></textarea>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="date">Start Date<br />
                            <input ref={(input) => this.startDate = input} type="date" className="formFields"/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="date">Deadline<br />
                            <input ref={(input) => this.endDate = input} type="date" className="formFields"/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="level">Urgency Level<br />
                            <select ref={(input) => this.level = input} className="formFields">
                                <option value="Normal">Nomal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Rapid Response">Rapid Response</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit" className="formBtn">Add Task</button>
                </form>
            </div>
        );
    }
}

export default TaskForm;
