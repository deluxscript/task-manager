import React from 'react';
import '../css/mainApp.css';

class App extends React.Component {

  componentDidMount(){
    // Set the style
    document.body.style.backgroundColor = "#F9FBFB"
  }

  render() {
    return (
      <div className="mainApp">
        <div className="middleOverlay">
          <div className="Task">
            <div className="TaskList">
              <div className="TaskList-Header">
                Your Tasks
              </div>
              
            </div>
            <div className="CreateTask">
              <div className="CreateTask-Header">
                Create a Task
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
