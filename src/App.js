import React, {Component, Fragment} from 'react';
import './App.css';

const Clock = (props) => {
  return (
    <div></div>
  )
};

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div style={{fontSize: "2.5em", padding: "1em 0"}}>Pomodoro Clock</div>
          <Clock/>
        </div>

        <footer style={{textAlign: "center",padding: "1.25em 1em", borderTop: "1px solid black", fontSize: "1.25em"}}>
          Link to github repo: <a style={{textDecoration: "none", color: "blue"}} href="https://github.com/lalitjain98/pomodoro-clock" rel="noopener noreferrer" target="_blank">github.com/lalitjain98/pomodoro-clock</a>
        </footer>

      </Fragment>

    );
  }
}

export default App;
