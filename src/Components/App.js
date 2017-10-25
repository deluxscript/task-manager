import React from 'react';
import TaskForm from './CreateTask/TaskForm';
import AllTask from './CreateTask/AllTask';

import '../css/mainApp.css';

class App extends React.Component {

  constructor() {
		super();

		this.Tasklist = this.Tasklist.bind(this);
		//initialState
		this.state = {
			Tasks: {}
		};
	}

  Tasklist(Task) {
    const Tasks = {...this.state.Tasks};
    //add in our new Task
		const timestamp = Date.now();
		Tasks[`Task-${timestamp}`] = Task;
		//set State
		this.setState({Tasks});
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
              <div className="col-md-5 TaskList">
                <div className="TaskList-Header">
                  Your Tasks
                </div>
                <div className="TaskList-Content">
                  <ul className="Tasklisting">
                    {
                      Object
                        .keys(this.state.Tasks)
                        .map(key => <AllTask key={key} index={key} details={this.state.Tasks[key]} />)
                    }
                  </ul>
                </div>
              </div>
              <div className="col-md-5 CreateTask">
                <div className="CreateTask-Header">
                  Create a Task
                </div>
                <div className="CreateTask-Content">
                  <TaskForm Tasklist={this.Tasklist}/>
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
