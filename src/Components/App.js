import React from 'react';
import TaskForm from './CreateTask/TaskForm';
import AllTask from './CreateTask/AllTask';
import AppBase from '../appbase';

import '../css/mainApp.css';

class App extends React.Component {

  state = {
    Tasks: {},
    switched: false
  };

  Tasklist = (Task) => {
    const Tasks = {...this.state.Tasks};
    //add in our new Task
		const timestamp = Date.now();
		Tasks[`Task-${timestamp}`] = Task;
		//set State
		this.setState({Tasks});

  };

  deleteTask = (key) => {
    const Tasks = {...this.state.Tasks};
    delete Tasks[key];
    this.setState({Tasks});
  };

  updateTask = (key, updatedTask) => {
    const Tasks = {...this.state.Tasks};
    Tasks[key] = updatedTask;
    this.setState({ Tasks });
  };

  componentWillMount(){

    this.ref = AppBase.syncState(`${this.props.params.managerId}/Tasks`, {
      context: this,
      state: 'Tasks'
    });

    //Is there an added task in localStorage?
    const localStorageStore = localStorage.getItem(`task-${this.props.params.managerId}`);

    if(localStorageStore) {
      this.setState({
        Tasks: JSON.parse(localStorageStore)
      });
    }
  }

  componentWillUnmount() {
    AppBase.removeBinding(this.ref);
  }
  
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`task-${this.props.params.managerId}`, JSON.stringify(nextState.Tasks));
  }

  componentDidMount(){
    // Set the style
    document.body.style.backgroundColor = "#F9FBFB"
  }

  render() {
    return (
      <div className="mainApp">
        <div className="middleOverlay">
          <div className="Task">
            <div className="row">
              <div className="col-md-6 TaskList">
                <div className="TaskList-Header">
                  Your Tasks
                </div>
                <div className="TaskList-Content">
                  <ul className="Tasklisting">
                    {
                      Object
                        .keys(this.state.Tasks)
                        .map(key => <AllTask key={key} index={key} details={this.state.Tasks[key]} deleteTask={this.deleteTask} Tasks={this.state.Tasks} updateTask={this.updateTask} params={this.props.params} />)
                    }
                  </ul>
                </div>
              </div>
              <div className="col-md-4 CreateTask">
                <div className="CreateTask-Header">
                  Start Managing Your Task
                </div>
                <div className="CreateTask-Content">
                  <TaskForm Tasklist={this.Tasklist} managerId={this.props.params.managerId}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
