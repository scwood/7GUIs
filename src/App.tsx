import styles from "./App.module.css";
import { Counter } from "./1-counter/Counter";
import { TemperatureConverter } from "./2-temperature-converter/TemperatureConverter";
import { FlightBooker } from "./3-flight-booker/FlightBooker";
import { Timer } from "./4-timer/Timer";
import { CRUD } from "./5-CRUD/CRUD";

export function App() {
  return (
    <div className={styles.container}>
      <h1>7GUIs</h1>
      <p>
        A{" "}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noreferrer"
        >
          Typescript
        </a>
        /
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          React
        </a>{" "}
        implementation of 7GUIs. 7GUIs is a series of GUI programming challenges
        created by Eugen Kiss. Read more about it{" "}
        <a
          href="https://eugenkiss.github.io/7guis"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
      <CRUD />
    </div>
  );
}
