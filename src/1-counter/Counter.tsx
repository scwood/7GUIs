import { useState } from "react";

import styles from "./Counter.module.css";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Counter</h2>
      <input type="text" className={styles.input} value={count} disabled />
      <button onClick={() => setCount((prev) => prev + 1)}>Count</button>
      <p>
        <a href="https://github.com/scwood/7guis">Source code</a>
      </p>
    </>
  );
}
