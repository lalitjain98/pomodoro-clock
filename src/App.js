import React, {Component, Fragment} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.css';
import 'reactstrap/dist/reactstrap';
import Media from "react-media";

const Row = (props) => {
  return(
    <div style={{
      ...props.styles,
      width:"-webkit-fill-available",
      display: "flex",
    }}>
      {props.children}
    </div>
  );
};

const Col = (props) => {
  return(
    <div style={{
      ...props.styles,
      display: "flex",
      flexDirection: "column",
    }}>
      {props.children}
    </div>
  );
};

const DurationController = (props) => {

  const {idPrefix} = props;

  return (
    <div style={{
      // padding: "20px",
      // backgroundColor: "aliceblue",
      color: "#222"
    }}>
      <Col styles={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
        <Row styles={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
          <div
            style={{
              textAlign: "center",
              fontSize: "2em",
              padding: "0.5em"
            }}
            id={idPrefix + '-label'}>
            {props.title}
          </div>
        </Row>
        <Row
          styles={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <button
            style={{
              // margin: "0.5em",
              color: "#444",
              padding: "0.5em",
              background: "none",
              border: "none"
            }}
            className="btn btn-link"
            disabled={props.disabled}
            id={idPrefix + '-decrement'}
            onClick={()=>props.onClick(-1)}>
            <span className="fa fa-2x fa-arrow-down fa-bold"></span>
          </button>
          <div
            style={{
              fontFamily: "Digital-7 Mono",
              color: "black",
              padding: "0.5em",
              fontSize: "2em"
            }}
            id={idPrefix + '-length'}>{props.count}</div>
          <button
            style={{
              color: "#444",
              // margin: "0.5em",
              padding: "0.5em",
              background: "none",
              border: "none"
            }}
            className="btn btn-link"
            disabled={props.disabled}
            id={idPrefix + '-increment'}
            onClick={()=>props.onClick(1)}>
            <span className="fa fa-2x fa-arrow-up fa-bold"></span>
          </button>
        </Row>
      </Col>
    </div>
  )
};

export const BEEP_URL = "https://goo.gl/65cBl1";

export const SESSION = "Session";
export const BREAK_ = "Break";

export const SESSION_KEY = "session";
export const BREAK_KEY = "break_";

function formatTime(time) {
  time = Math.trunc(time);
  return time%10 === time ? "0" + time : time;
}

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      session: this.SESSION_TIME_DEFAULT,
      break_: this.BREAK_TIME_DEFAULT,
      time: this.SESSION_TIME_DEFAULT,
      timerLabel: SESSION,
      running: false,
    };
    this.toggleRun = this.toggleRun.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.playTimer = this.playTimer.bind(this);
    this.handler = this.handler.bind(this);
  }

  BEEP = null;
  clock = null;
  SESSION_TIME_DEFAULT = 25*60; //25;
  BREAK_TIME_DEFAULT = 5*60; //5;
  componentDidMount() {
    this.BEEP = document.getElementById("beep");
  }

  handleClick(key, change){
    this.setState(state=>{

      let {timerLabel, running, session, break_} = state;
      let newState = Object.assign({}, state);

      console.log("Initial State", newState);

      if(running){
        return newState;
      }

      if((change === -1 && state[key] === 60) || (change === 1 && state[key] === 60*60)){
        return newState;
      }

      console.log("Timer:", this.clock);
      console.log("timerLabel:", timerLabel);
      console.log("Key:", key);

      // convert change to seconds
      change *= 60;

      // if(this.timer === null){

        if(timerLabel === SESSION){
          if(key === SESSION_KEY){
            //change session in paused session
            newState.session = session + change;
            newState.time = newState.session;
          } else {
            newState.break_ = break_ + change;
          }
        } else {
          if(key === SESSION_KEY){
            //change session in paused session
            newState.session = session + change;
          } else {
            //change break in paused session
            newState.break_ = break_ + change;
            newState.time = newState.break_;
          }
        }

      // }
      // else{
      //
      // }
      console.log("Final State", newState);
      // console.log("Original State", state);
      return newState;
    });
  }

  toggleRun() {
    if(!this.state.running) {
      this.playTimer();
    }else{
      this.pauseTimer();
    }
  }

  resetTimer() {
    console.log(
      document.getElementById("time-left").innerText,
      document.getElementById("session-length")
    );
    // this.BEEP = resetAudio(this.BEEP);
    //this.BEEP.stop();
    this.BEEP.pause();
    this.BEEP.currentTime = 0;
    this.setState(state=>{
      clearInterval(this.clock);
      return {
        ...state,
        timerLabel: SESSION,
        time: this.SESSION_TIME_DEFAULT,
        running: false,
        session: this.SESSION_TIME_DEFAULT,
        break_: this.BREAK_TIME_DEFAULT
      }
    });
  }

  handler(){

    if(this.state.time === 0){
      // this.BEEP.play();
      this.setState(state=>{
        clearInterval(this.clock);
        this.startTimer();

        return {
          ...state,
          time: (state.timerLabel === SESSION?state.break_:state.session),
          running: false,
          timerLabel: (state.timerLabel === SESSION ? BREAK_ : SESSION)
        }
      }, ()=>{
        // clearInterval(this.timer);
        // this.startTimer();
      });
      // clearInterval(this.timer);
      return;
    }

    this.setState(state=>{
      return {
        ...state,
        time: state.time-1,
      }
    })
  };

  startTimer() {
    console.log(
      document.getElementById("time-left").innerText,
      document.getElementById("session-length")
    );
    this.setState(state=>{
      this.clock = setInterval(this.handler, 1000);
      return {
        ...state,
        running: true,
        time: (state.timerLabel === SESSION?state.session:state.break_),
      }
    }, ()=>{
      // this.timer = setInterval(this.handler, 1000);
    });
  }

  pauseTimer() {
    console.log(
      document.getElementById("time-left").innerText,
      document.getElementById("session-length")
    );
    this.setState(state=>{
      clearInterval(this.clock);
      return {
        ...state,
        running: false,
      }
    },()=>{
      // clearInterval(this.timer);
    });
  }

  playTimer() {
    console.log(
      document.getElementById("time-left").innerText,
      document.getElementById("session-length")
    );
    this.setState(state=>{
      this.clock = setInterval(this.handler, 1000);
      return {
        ...state,
        running: true,
        // minutes: (state.timerLabel === SESSION?state.session:state.break_),
      }
    }, ()=>{
    //  this.timer = setInterval(this.handler, 1000);
    });

  }

  render() {
    if(this.state.time === 0){
      this.BEEP.play();
    }

    const durationItems = (
      <Fragment>
        <DurationController
          disabled={false}
          idPrefix = "break"
          title = "Break Length"
          onClick = {(change)=>this.handleClick(BREAK_KEY, change)}
          count = {this.state.break_/60}
        />
        <DurationController
          disabled={false}
          idPrefix = "session"
          title = "Session Length"
          onClick = {(change)=>this.handleClick(SESSION_KEY, change)}
          count = {this.state.session/60}
        />
      </Fragment>
    );

    return (
      <div>
        <Row styles={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
          <Media query={"(max-width: 768px)"}>
            {
              matches => matches ?
                (
                  <Col>
                    {durationItems}
                  </Col>
                )
                :
                (
                  <Row>
                    {durationItems}
                  </Row>
                )
            }
          </Media>
        </Row>
        <Row>
          <Col styles={{width: "-webkit-fill-available"}}>
            <div style={{
              margin: "1em",
              padding: "0.5em",
              alignSelf: "center",
              fontSize: "3em",
              color: "white",
              // background: "white",
              background: (this.state.time < 60 ? "linear-gradient(to bottom right, #ffdddd, #ffcccc)" : "linear-gradient(to bottom right, #009999, #008888)"),
              border: ("10px double " + (this.state.time < 60 ? "red" : "white")),
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 white"
            }}>
            <Row styles={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div
                style={{
                  fontFamily: "Roboto Mono, Consolas",
                  color: (this.state.time < 60 ? "red" : "inherit"),
                  textAlign: "center",
                  alignSelf: "center",
                }}
                id="timer-label">{this.state.timerLabel}</div>
            </Row>
            <Row
              styles={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div style={{fontFamily: "Digital-7 Mono", color: (this.state.time < 60 ? "red" : "inherit")}} id='time-left'>{`${formatTime(this.state.time/60)}:${formatTime(this.state.time%60)}`}</div>
            </Row>
            </div>
            <Row styles={{justifyContent: "center"}}>
              <button
                style={{
                  color: "#444",
                  margin: "0.5em 1em",
                  padding: "0.5em",
                  background: "none",
                  border: "none"
                }}
                className="btn btn-link"
                // disabled={this.state.disabled}
                id="start_stop"
                onClick={()=>this.toggleRun()}>
                {
                  this.state.running ? (<span className="fa fa-2x fa-pause"></span>) : (<span className="fa fa-2x fa-play"></span>)
                }
              </button>
              <button
                style={{
                  margin: "0.5em 1em",
                  color: "#444",
                  padding: "0.5em",
                  background: "none",
                  border: "none"
                }}
                className="btn btn-link"
                // disabled={props.disabled}
                id="reset"
                onClick={()=>this.resetTimer()}>
                <span className="fa fa-2x fa-refresh"></span>
              </button>
            </Row>
          </Col>
        </Row>
        <audio src={BEEP_URL} id={"beep"}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div style={{color: "#222", fontSize: "3em", padding: "0.5em 0", margin: 0, textAlign:"center", alignSelf: "center"}}>Pomodoro Clock</div>
          <Clock/>
        </div>

        <footer style={{textAlign: "center",padding: "1.25em 1em", borderTop: "1px solid black"}}>
          Link to github repo: <a style={{textDecoration: "none", color: "blue"}} href="https://github.com/lalitjain98/pomodoro-clock" rel="noopener noreferrer" target="_blank">github.com/lalitjain98/pomodoro-clock</a>
        </footer>

      </div>

    );
  }
}

export default App;
