import React, {Component} from 'react'
import './App.css'

class App extends Component{
  constructor (props){
    super (props);
    this.state ={
      watch: "",
      timer: ""
    }
  }
  activateWatch=()=>{
    this.setState({
      watch: <Watch />,
      timer:""
    })
    document.getElementsByClassName("app")[0].style.marginTop=0;
  }
  activateTimer=()=>{
    this.setState({
      timer: <Timer />,
      watch:""
    })
    document.getElementsByClassName("app")[0].style.marginTop=0;
  }
  render(){
    return(
      <div className="app">
        <div>
          <div>
            {this.state.watch}
          </div>
          <div>
            {this.state.timer}
          </div>
          <div className="navbtns">
            <button onClick={this.activateWatch} className="stopWatchButton navbtn">Stop Watch</button>  
            <button onClick={this.activateTimer} className="timerButton navbtn">Timer</button>
          </div>
        </div> 
      </div>
    );
  }
}


class Watch extends Component{
  constructor (props){
    super(props);
    this.state={
      secs: 0,
      min: 0,
      hours: 0,
      clicked: false
    }
  }
  startTimer=()=>{
    if(!this.state.clicked){
      this.setState({
        clicked: true
      })
      this.timerID= setInterval( (e) => this.tick(), 1000);
    }
  }
  stopTimer=()=>{
    this.setState({
      clicked: false
    })
    clearInterval(this.timerID)
  }
  restartTimer=()=>{
    this.stopTimer();
    this.setState({
      secs: 0,
      min: 0,
      hours: 0
    })
  }
  tick(){
    if(this.state.clicked){
      this.setState({
        secs : this.state.secs + 1
      })
      if (this.state.secs===60){
        this.setState({
          secs: 0,
          min : this.state.min + 1
        })
      }
      if (this.state.min===60){
        this.setState({
          min: 0,
          hours : this.state.hours + 1
        })
      }
    }
  }
  render(){
    return(
      <div className="counter">
        <h2>Counter</h2>
        <div className="roundBorder">
          <h1>{this.state.hours+":"+this.state.min+":"+this.state.secs}</h1>
        </div>
        <button onClick={this.startTimer} className="counterControl">Start</button> <button onClick={this.stopTimer} className="counterControl">Stop</button> <button onClick={this.restartTimer} className="counterControl">Clear</button>
      </div>
    );
  }
}

class Timer extends Component{
  constructor (props){
    super (props);
    this.state={
      timerH: 0,
      timerM:0,
      timerS:0,
      clicked: false
    }
  }
  countDown=()=>{
    this.setState({
      timerH:document.getElementsByClassName("timerHours")[0].value,
      timerM:document.getElementsByClassName("timerMinutes")[0].value,
      timerS:document.getElementsByClassName("timerSeconds")[0].value,
    })
  }
  downCounter=()=>{
    if(!this.state.clicked){
      this.setState({
        clicked:true
      })
      this.timerID=setInterval( ()=> this.downTick(), 1000)
    }
  }
  pauseCounter=()=>{
    this.setState({
      clicked:false
    })
    clearInterval(this.timerID);
  }
  downTick=()=>{
    if(this.state.clicked){
      if((this.state.timerS===0) && (this.state.timerM===0) && (this.state.timerH===0)){
        clearInterval(this.timerID);
      }
      if((this.state.timerS===4) && (this.state.timerM===0) && (this.state.timerH)){
        document.getElementsByClassName("currentTime")[0].style.color="red";
      }
      else if(this.state.timerS>3){
        document.getElementsByClassName("currentTime")[0].style.color="white";
      }
      if(this.state.timerS>0){
        this.setState({
        timerS: this.state.timerS -1
        })
      }
      if(this.state.timerS==0){
        if(this.state.timerM >0){
          this.setState({
            timerS: 59,
            timerM: this.state.timerM -1
          })
        }
        else{
          this.setState({
            timerS:0
          })
        }
      }
      if(this.state.timerM==0){
        if((this.state.timerH >0) && (this.state.timerS ==0)){
          this.setState({
            timerM: 60,
            timerH: this.state.timerH -1
          })
        }
        else{
          this.setState({
            timerM:0
          })
        }
      }
    }
  }
  render(){
    return(
      <div className="timer">
        <h2>Timer</h2>
        <div className="inputs">
          <input type="number" className="timerHours" placeholder="H" />
          <input type="number" className="timerMinutes" placeholder="M" />
          <input type="number" className="timerSeconds" placeholder="S" />
          <button onClick={this.countDown}>Set</button>
        </div>
        <div className="timerClock">
          <div className="roundBorder">
            <h1 className="currentTime">{this.state.timerH+":"+this.state.timerM+":"+this.state.timerS}</h1>
          </div>
          <button onClick={this.downCounter}>Go</button> <button onClick={this.pauseCounter}>Pause</button>
        </div>
      </div>
    );
  }
}
export default App;
