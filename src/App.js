import React, {Component, Fragment} from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.css';
import 'reactstrap/dist/reactstrap';

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
      <Col>
        <Row>
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
  return time%10 === time ? "0" + time : time;
}

const resetAudio = (audio) => {
  audio.currentTime = 0;
  return audio;
};

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      session: this.SESSION_TIME_DEFAULT,
      break_: this.BREAK_TIME_DEFAULT,
      minutes: this.SESSION_TIME_DEFAULT,
      seconds: 0,
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
  timer = null;
  SESSION_TIME_DEFAULT = 25; //25;
  BREAK_TIME_DEFAULT = 5; //5;
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

      if((change === -1 && state[key] === 1) || (change === 1 && state[key] === 60)){
        return newState;
      }

      console.log("Timer:", this.timer);
      console.log("timerLabel:", timerLabel);
      console.log("Key:", key);

      // if(this.timer === null){

        if(timerLabel === SESSION){
          if(key === SESSION_KEY){
            //change session in paused session
            newState.session = session + change;
            newState.minutes = newState.session;
            newState.seconds = 0;
          } else {
            //change break in paused session
            newState.break_ = break_ + change;
            // newState.minutes = newState.break_;
            // newState.seconds = 0;
          }
        } else {
          if(key === SESSION_KEY){
            //change session in paused session
            newState.session = session + change;
            // newState.minutes = newState.session;
            // newState.seconds = 0;
          } else {
            //change break in paused session
            newState.break_ = break_ + change;
            newState.minutes = newState.break_;
            newState.seconds = 0;
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
    // this.setState(state=>{
    //   return {
    //     ...state,
    //     running: !state.running
    //   }
    // }, ()=>{
    //   if(this.state.running){
    //     this.startTimer();
    //   }else{
    //     this.pauseTimer();
    //   }
    // });
  }

  resetTimer() {
    //this.BEEP = resetAudio(this.BEEP);
    this.BEEP.pause();
    this.BEEP.currentTime = 0;
    this.setState(state=>{
      clearInterval(this.timer);
      return {
        ...state,
        timerLabel: SESSION,
        minutes: this.SESSION_TIME_DEFAULT,//(state.timerLabel === SESSION?this.SESSION_TIME_DEFAULT:this.BREAK_TIME_DEFAULT),
        seconds: 0,
        running: false,
        session: this.SESSION_TIME_DEFAULT,
        break_: this.BREAK_TIME_DEFAULT
      }
    });
  }

  handler(){

    if(this.state.minutes === 0 && this.state.seconds === 0){
      // this.BEEP.play();
      this.setState(state=>{
        clearInterval(this.timer);
        this.startTimer();

        return {
          ...state,
          minutes: (state.timerLabel === SESSION?state.break_:state.session),
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
      let minutes = state.seconds===0 ? state.minutes-1 : state.minutes;
      let seconds = (state.seconds-1);
      seconds = seconds < 0 ? seconds + 60 : seconds;

      return {
        ...state,
        seconds: seconds,
        minutes: minutes
      }
    })
  };

  startTimer() {
    this.setState(state=>{
      this.timer = setInterval(this.handler, 1000);
      return {
        ...state,
        running: true,
        minutes: (state.timerLabel === SESSION?state.session:state.break_),
      }
    }, ()=>{
      // this.timer = setInterval(this.handler, 1000);
    });
  }

  pauseTimer() {
    this.setState(state=>{
      clearInterval(this.timer);
      return {
        ...state,
        running: false,
      }
    },()=>{
      // clearInterval(this.timer);
    });
  }

  playTimer() {
    this.setState(state=>{
      this.timer = setInterval(this.handler, 1000);
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

    if(this.state.minutes === 0 && this.state.seconds === 0){
      this.BEEP.play();
    }

    return (
      <div>
        <Row>
          <DurationController
            disabled={false}
            idPrefix = "break"
            title = "Break Length"
            onClick = {(change)=>this.handleClick(BREAK_KEY, change)}
            count = {this.state.break_}
          />
          <br/>
          <DurationController
            disabled={false}
            idPrefix = "session"
            title = "Session Length"
            onClick = {(change)=>this.handleClick(SESSION_KEY, change)}
            count = {this.state.session}
          />
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
              background: (this.state.minutes === 0 ? "linear-gradient(to bottom right, #ffdddd, #ffcccc)" : "linear-gradient(to bottom right, #009999, #008888)"),
              border: ("10px double " + (this.state.minutes === 0 ? "red" : "white")),
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
                  color: (this.state.minutes === 0 ? "red" : "inherit"),
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
              <div style={{fontFamily: "Digital-7 Mono", color: (this.state.minutes === 0 ? "red" : "inherit")}} id='time-left'>{`${formatTime(this.state.minutes)}:${formatTime(this.state.seconds)}`}</div>
            </Row>
            </div>
            <Row styles={{justifyContent: "space-around"}}>
              <button
                style={{
                  color: "#444",
                  // margin: "0.5em",
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
                  // margin: "0.5em",
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
          <div style={{color: "#222", fontSize: "3em", padding: "0.5em 0", margin: 0}}>Pomodoro Clock</div>
          <Clock/>
        </div>

        <footer style={{textAlign: "center",padding: "1.25em 1em", borderTop: "1px solid black", fontSize: "1.25em"}}>
          Link to github repo: <a style={{textDecoration: "none", color: "blue"}} href="https://github.com/lalitjain98/pomodoro-clock" rel="noopener noreferrer" target="_blank">github.com/lalitjain98/pomodoro-clock</a>
        </footer>

      </div>

    );
  }
}

export default App;
