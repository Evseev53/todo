import React from 'react';

export default function Timer ({ sec, id, timer, timerStart, timerStop }) {

  const convertSecInTime = (value) => {
    let seconds = value;
    let min;
    let hour = seconds / 3600;
    hour = Math.trunc(hour);
    seconds -= hour * 3600;
    min = seconds / 60;
    min = Math.trunc(min);
    seconds -= min * 60;
    const convert = (num) => {
      num = num.toString();
      if (num.length === 1) {
        num = `0${num}`;
        return num;
      }
      return num;
    }
    return `${convert(hour)}:${convert(min)}:${convert(seconds)}`;
  }

  const onClickPlay = () => {
    if (timer === 'off') {
      timerStart(id, timer);
    }
  }

  const onClickPause = () => {
    if (timer === 'on') {
      timerStop(id, timer);
    }
  }

  const timeInString = convertSecInTime(sec);
  return (
    <span className="description">
      <button type="button" className="icon icon-play" onClick={onClickPlay}/>
      <button type="button" className="icon icon-pause" onClick={onClickPause}/>
      <span className="description">
        <div className="timer">
          { timeInString }
        </div>
      </span>
    </span>
  )
}