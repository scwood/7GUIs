import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import styles from "./Timer.module.css";

export function Timer() {
  const [duration, setDuration] = useState(10000);
  const [startDate, setStartDate] = useState(new Date());
  const [now, setNow] = useState(new Date());

  const progress = Math.min(
    100,
    ((now.getTime() - startDate.getTime()) / duration) * 100
  );

  useEffect(() => {
    setInterval(() => setNow(new Date()), 100);
  }, []);

  function reset() {
    setStartDate(new Date());
    setNow(new Date());
  }

  return (
    <>
      <h2>4. Timer</h2>
      <div className={styles.container}>
        <label>Elapsed time</label>
        <ProgressBar progress={progress} />
        <label>Duration: {duration / 1000}s</label>
        <input
          type="range"
          min="0"
          max="30000"
          step="100"
          value={duration}
          onChange={(event) => setDuration(parseInt(event.target.value))}
        />
        <button onClick={reset}>Reset</button>
      </div>
      <p>
        <a
          href="https://github.com/scwood/7GUIs/blob/main/src/4-timer/Timer.tsx"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
