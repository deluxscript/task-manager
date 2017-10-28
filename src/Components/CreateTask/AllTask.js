import React from 'react';
import ReactModal from 'react-modal';
import Switch from 'react-toggle-switch';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaPencil from 'react-icons/lib/fa/pencil';

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
    width                 : '50%',
    height                : '50%'
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
    this.toggleSwitch = this.toggleSwitch.bind(this);
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
    
    const {details} = this.props;
    const SwitchElement = this.state.switched;
    const taskResult = SwitchElement === false;
    const btnText = taskResult ? 'Task not yet completed' : 'Task completed';

    return (
        <li>
          <div id={this.props.index} className="well">
            <p className="bold">{details.name}<span className="date"><FaTrashO /></span></p>
            {/*<p>{details.desc}</p>*/}
            <p>Urgency Level - <span className="levelText">{details.level}</span></p>
            <div title="Toggle for task completion"><Switch onClick={this.toggleSwitch} on={this.state.switched} className='other-class'/></div>
            <a className="fullDetail" onClick={this.openModal}>Full details<span className="date">{details.date}</span></a>
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
            <p className="text-center"><span className="ModalHeader" ref={subtitle => this.subtitle = subtitle}>Task Details</span><span className="closeModal" onClick={this.closeModal}>&times;</span></p>
            
            <p>Name: <span>{details.name}</span><span className="editIcon"><FaPencil /></span></p>
            <p>Date: <span>{details.date}</span><span className="editIcon"><FaPencil /></span></p>
            <p>Urgency Level: <span>{details.level}</span><span className="editIcon"><FaPencil /></span></p>
            <p>Description:<span className="editIcon"><FaPencil /></span></p>
            <p>{details.desc}</p>
            </ReactModal>
          </div>
        </li>
    );
  }
}

export default AllTask;
