import React from 'react';
import '../../css/mainApp.css';

class TaskForm extends React.Component {

    createTask(event) {
        event.preventDefault();
        console.log('You submitted your task');

        //Hold on to the field values.....
        const Task = {
            name: this.name.value,
            desc: this.desc.value,
            date: this.date.value,
            level: this.level.value,
        }
        console.log(Task);

        this.taskForm.reset();
        this.props.Tasklist(Task);
    }

  render() {
    return (
        <form ref={(input) => {this.taskForm = input}} className="createTask" onSubmit={(e) => this.createTask(e)}>
            <div>
                <label htmlFor="name">Name<br />
                    <input ref={(input) => {this.name = input}} type="text" className="formFields"/>
                </label>
            </div>
            
            <div>
                <label htmlFor="desc">Description<br />
                    <textarea ref={(input) => {this.desc = input}} className="formFields" rows="7"></textarea>
                </label>
            </div>

            <div>
                <label htmlFor="date">Assigned Date<br />
                    <input ref={(input) => {this.date = input}} type="date" className="formFields"/>
                </label>
            </div>

            <div>
                <label htmlFor="level">Urgency Level<br />
                    <select ref={(input) => {this.level = input}} className="formFields">
                        <option value="normal">Nomal</option>
                        <option value="urgent">Urgent</option>
                        <option value="rapid response">Rapid Response</option>
                    </select>
                </label>
            </div>
            <button type="submit" className="formBtn">Add Task</button>
        </form>
    );
  }
}

export default TaskForm;
