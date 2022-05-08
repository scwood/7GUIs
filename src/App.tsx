import styles from "./App.module.css";
import { Counter } from "./1-counter/Counter";
import { TemperatureConverter } from "./2-temperature-converter/TemperatureConverter";
import { FlightBooker } from "./3-flight-booker/FlightBooker";
import { Timer } from "./4-timer/Timer";

export function App() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>7GUIs</h1>
        <p>
          A Typescript/React implementation of 7GUIs. 7GUIs is a series of GUI
          programming challenges created by Eugen Kiss. Read more about it{" "}
          <a href="https://eugenkiss.github.io/7guis">here</a>.
        </p>
        <Counter />
        <TemperatureConverter />
        <FlightBooker />
        <Timer />
      </div>
    </div>
  );
}
