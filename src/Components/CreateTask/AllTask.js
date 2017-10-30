import React from 'react';
import ReactModal from 'react-modal';
import Switch from 'react-toggle-switch';
import FaTrashO from 'react-icons/lib/fa/trash-o';
// import FaPencil from 'react-icons/lib/fa/pencil';

import '../../css/mainApp.css';
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '70%',
    height                : '80%'
  }
};

class AllTask extends React.Component {

  constructor() {
    super();

    this.state = {
      showModal: false,
      switched: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  toggleSwitch = () => {
    this.setState(prevState => {
      return {
        switched: !prevState.switched
      };
    });
  };

  openModal() {
    this.setState({showModal: true});
    console.log('Open modal');
  }

  afterOpenModal() {
    this.subtitle.style.color = '#5E6784';
  }

  closeModal() {
    this.setState({showModal: false});
  }

   renderEdit = (key) => {
     const details = this.props.Tasks[key];
     return(
        <div id={key} className="task-edit" key={key}>
          <p>Task Name - {details.name}</p>
          <div>
            <input type="text" name="name" value={details.name} className="editFields" placeholder="task Name" onChange={(e) => this.handleChange(e, key)} />
          </div>
          <div>
            <textarea type="text" rows="7" name="desc" value={details.desc} className="editFields" placeholder="task Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
          </div>

          <div>
            <select type="text" name="level" value={details.level} className="editFields" placeholder="task Status" onChange={(e) => this.handleChange(e, key)}>
              <option value="Normal">Fresh!</option>
              <option value="Urgent">Sold Out!</option>
              <option value="Rapid Response">Sold Out!</option>
            </select>
          </div>
          
          <div>
            <input type="date" name="date" value={details.date} className="editFields" placeholder="task Image" onChange={(e) => this.handleChange(e, key)}/>
          </div>
        </div>
    )
  }
  handleChange = (e, key) => {
    const Task = this.props.Tasks[key];
    // take a copy of that task and update it with the new data
    const updatedTask = {
      ...Task,
      [e.target.name]: e.target.value
    }
    this.props.updateTask(key, updatedTask);
  }

  componentDidMount(){

    const {details} = this.props;

    const FirstLevel = details.level === 'Normal';
    const SecondLevel = details.level === 'Urgent';
    const ThirdLevel = details.level === 'Rapid Response';

    if(FirstLevel){
      document.getElementById(`${this.props.index}`).style.borderLeft = "5px solid green";
    }
    if(SecondLevel){
      document.getElementById(`${this.props.index}`).style.borderLeft = "5px solid pink";
    }
    if(ThirdLevel){
      document.getElementById(`${this.props.index}`).style.borderLeft = "5px solid red";
    }
  }

  render() {
    
    const { details, index } = this.props;
    const SwitchElement = this.state.switched;
    const taskResult = SwitchElement === false;
    const btnText = taskResult ? 'Task not yet completed' : 'Task completed';

    return (
        <li>
          <div id={index} className="well">
            <p className="bold">
              {details.name}
              <span title="Delete Task" className="delete" onClick={() => this.props.deleteTask(index)}><FaTrashO /></span>
            </p>
            <p>{details.desc}</p>
            <p>Urgency Level - <span className="levelText">{details.level}</span></p>
            <div title="Toggle for task completion"><Switch onClick={this.toggleSwitch} on={this.state.switched} className='other-class'/></div>
            <a className="fullDetail" onClick={this.openModal}>Edit Task<span className="date">{details.date}</span></a>
            <div>
              <button className="resultBtn" disabled={!taskResult}>{btnText}</button>
            </div>
            <ReactModal
              isOpen={this.state.showModal}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Task Details"
            >
            <p className="text-center">
              <span className="ModalHeader" ref={subtitle => this.subtitle = subtitle}>Task Details</span>
              <span className="closeModal" onClick={this.closeModal}>&times;</span>
            </p>
            {Object.keys(this.props.Tasks).map(this.renderEdit)}
            </ReactModal>
          </div>
        </li>
    );
  }
}


export default AllTask;
