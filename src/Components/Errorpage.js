import React from 'react';
import '../css/Error.css';

class Errorpage extends React.Component {

  componentDidMount(){
    // Set the style
    document.body.style.backgroundColor = "black"
  }
  render() {
    return (
      <div className="mainC">
        <div className="message">
          <h1>404</h1>
          <h3>The page you seek does not exist</h3>
        </div>
      </div>
    );
  }
}

export default Errorpage;
