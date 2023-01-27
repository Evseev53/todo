import React, { Component } from 'react';

export default class Timer extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {

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
    const { id, timer, timerStart } = this.props;
    if (timer === 'off') {
      timerStart(id, timer);
    }
  }

  onClickPause = () => {
    const { id, timer, timerStop } = this.props;
    if (timer === 'on') {
      timerStop(id, timer);
    }
  }

  render() {
    const { sec } = this.props;
    const timeInString = this.convertSecInTime(sec);
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