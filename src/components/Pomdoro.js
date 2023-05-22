import { useState, useEffect } from "react";
import alarmAudio from "./alaramAudio.mp3";
function Pomodoro() {
  const [isPause, setIsPause] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timeLeft, setTimerLeft] = useState(0);
  const [showTime, setShowTime] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    const audio = new Audio(alarmAudio);

    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTimerLeft((prev) => prev - 1);

        if (timeLeft <= 1) {
          audio.play();
          clearInterval(timer);
          alert("Time is done");

          setIsRunning(false);
          setIsPause(false);
          setShowTime(false);
          audio.pause();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const handleStart = () => {
    if (timer <= 0) {
      setInputValid(true);
      return;
    }
    setInputValid(false);
    setShowTime(true);
    if (isPause) {
      setIsRunning(true);

      return;
    }

    setIsRunning(true);
    setTimerLeft(+timer * 60);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPause(true);
  };
  const handleReset = () => {
    setIsRunning(false);
    setIsPause(false);
    setShowTime(false);

    setTimerLeft(+timer * 60);
  };
  const handleTimerChange = (e) => {
    setTimer(Math.floor(e.target.value));
  };

  const inputClass = inputValid ? "invalid" : "";
  return (
    <div className="timerDiv">
      {!isRunning && !isPause && (
        <input
          placeholder="Minutes"
          type="number"
          min="0"
          value={timer}
          onInput={handleTimerChange}
          className={inputClass}
        />
      )}
      {inputValid && <p className="error-text">Enter Valid Minutes</p>}
      {showTime && (
        <h2>{`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</h2>
      )}

      {isRunning ? (
        <button onClick={handlePause} className="pause">
          pause
        </button>
      ) : (
        <button onClick={handleStart} className="start">
          start
        </button>
      )}
      <button onClick={handleReset} className="reset">
        reset
      </button>
    </div>
  );
}

export default Pomodoro;
