import React from 'react';
// import DayPicker from 'react-day-picker';
// import '../../../node_modules/react-day-picker/lib/style.css';
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
                    <input ref={(input) => {this.name = input}} type="text" required className="formFields"/>
                </label>
            </div>
            
            <div>
                <label htmlFor="desc">Description<br />
                    <textarea ref={(input) => {this.desc = input}} className="formFields" required rows="7"></textarea>
                </label>
            </div>

            <div>
                <label htmlFor="date">Assigned Date<br />
                    <input ref={(input) => {this.date = input}} type="date" required className="formFields"/>
                </label>
            </div>

            <div>
                <label htmlFor="level">Urgency Level<br />
                    <select ref={(input) => {this.level = input}} className="formFields">
                        <option value="Normal">Nomal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Rapid Response">Rapid Response</option>
                    </select>
                </label>
            </div>
            <button type="submit" className="formBtn">Add Task</button>
        </form>
    );
  }
}

export default TaskForm;
