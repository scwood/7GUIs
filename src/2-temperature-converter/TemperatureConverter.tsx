import { ChangeEventHandler, useState } from "react";

import styles from "./TemperatureConverter.module.css";

enum TemperatureUnit {
  Celsius,
  Fahrenheit,
}

function toFahrenheit(temperatureInCelsius: number): number {
  return temperatureInCelsius * (9 / 5) + 32;
}

function toCelsius(temperatureInFahrenheit: number): number {
  return (temperatureInFahrenheit - 32) * (5 / 9);
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<string>("");

  function createTemperatureChangeHandler(
    unit: TemperatureUnit
  ): ChangeEventHandler<HTMLInputElement> {
    return (event) => {
      const value = event.target.value;
      const number = parseInt(value);
      if (unit === TemperatureUnit.Celsius) {
        setCelsius(value);
        if (!isNaN(number)) {
          setFahrenheit(String(toFahrenheit(number)));
        }
      } else {
        setFahrenheit(value);
        if (!isNaN(number)) {
          setCelsius(String(toCelsius(number)));
        }
      }
    };
  }

  return (
    <>
      <h2>Temperature converter</h2>
      <div className={styles.form}>
        <input
          type="text"
          value={celsius}
          onChange={createTemperatureChangeHandler(TemperatureUnit.Celsius)}
        />
        <span>Celsius = </span>
        <input
          type="text"
          value={fahrenheit}
          onChange={createTemperatureChangeHandler(TemperatureUnit.Fahrenheit)}
        />
        <span>Fahrenheit</span>
      </div>
      <p>
        <a href="https://github.com/scwood/7guis">Source code</a>
      </p>
    </>
  );
}
