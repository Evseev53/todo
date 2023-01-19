import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    timer: 'off'
  }

  componentDidMount() {
    const { sec } = this.props;
    this.setState({seconds: sec});
  }

  componentWillUnmount() {
    const { updateSecondsInTodo, id } = this.props;
    const { seconds } = this.state;
    updateSecondsInTodo(seconds, id);
  }

  timerToggle = (s) => {
    let secCopy = s;
    const { timer } = this.state;
    let setIntervalTurnOn;
    if (timer === 'off') {
      setIntervalTurnOn = setInterval(() => {
        secCopy += 1;
        this.setState({
          seconds: secCopy
        })
      }, 1000);
      this.setState({
        timer: 'on',
        setIntervalId: setIntervalTurnOn,
      });
    } else {
      const { setIntervalId } = this.state;
      clearInterval(setIntervalId);
      this.setState({timer: 'off'});
    }
  }

  convertSecInTime = (value) => {
    let sec = value;
    let min;
    let hour = sec / 3600;
    hour = Math.trunc(hour);
    sec -= hour * 3600;
    min = sec / 60;
    min = Math.trunc(min);
    sec -= min * 60;
    const convert = (num) => {
      num = num.toString();
      if (num.length === 1) {
        num = `0${num}`;
        return num;
      }
      return num;
    }
    return `${convert(hour)}:${convert(min)}:${convert(sec)}`;
  }

  onClickPlay = () => {
    const { timer, seconds } = this.state;
    if (timer === 'off') {
      this.timerToggle(seconds);
    }
  }

  onClickPause = () => {
    const { timer, seconds } = this.state;
    if (timer === 'on') {
      this.timerToggle(seconds);
    }
  }

  render() {
    const { seconds } = this.state;
    const timeInString = this.convertSecInTime(seconds);
    return (
      <span className="description">
        <button type="button" className="icon icon-play" onClick={this.onClickPlay}/>
        <button type="button" className="icon icon-pause" onClick={this.onClickPause}/>
        <span className="description">
          <div className="timer">
            { timeInString }
          </div>
        </span>
      </span>
    )
  }
}