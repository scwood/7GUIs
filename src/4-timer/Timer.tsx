import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import styles from "./Timer.module.css";

export function Timer() {
  const [duration, setDuration] = useState(10000);
  const [start, setStart] = useState(new Date());
  const [now, setNow] = useState(new Date());

  const progress = Math.min(
    ((now.getTime() - start.getTime()) / duration) * 100,
    100
  );

  useEffect(() => {
    setInterval(() => setNow(new Date()), 100);
  }, []);

  function reset() {
    const now = new Date();
    setStart(now);
    setNow(now);
  }

  return (
    <>
      <h2>Timer</h2>
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
        <a href="https://github.com/scwood/7guis">Source code</a>
      </p>
    </>
  );
}
