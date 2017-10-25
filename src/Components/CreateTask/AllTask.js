import React from 'react';
import '../../css/mainApp.css';

class AllTask extends React.Component {

  componentDidMount(){

    const {details} = this.props;
    
    const FirstLevel = details.level === 'normal';
    const SecondLevel = details.level === 'urgent';
    const ThirdLevel = details.level === 'rapid response';

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

    return (
        <li>
          <div id={this.props.index} className="well">
            <p>{details.name} <span className="date">{details.date}</span></p>
            {/*<p>{details.desc}</p>*/}
            <p>Urgency Level - <span>{details.level}</span></p>
            <a>Full details</a>
          </div>
        </li>
    );
  }
}

export default AllTask;
