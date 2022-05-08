import { ChangeEventHandler, useState } from "react";

import styles from "./TemperatureConverter.module.css";

function toFahrenheit(temperatureInCelsius: number): number {
  return temperatureInCelsius * (9 / 5) + 32;
}

function toCelsius(temperatureInFahrenheit: number): number {
  return (temperatureInFahrenheit - 32) * (5 / 9);
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const valueString = event.target.value;
    const valueNumber = parseInt(valueString);
    setCelsius(valueString);
    if (!isNaN(valueNumber)) {
      setFahrenheit(String(toFahrenheit(valueNumber)));
    }
  };

  const handleFahrenheitChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const valueString = event.target.value;
    const valueNumber = parseInt(valueString);
    setFahrenheit(valueString);
    if (!isNaN(valueNumber)) {
      setCelsius(String(toCelsius(valueNumber)));
    }
  };

  return (
    <>
      <h2>2. Temperature converter</h2>
      <div className={styles.form}>
        <input type="text" value={celsius} onChange={handleCelsiusChange} />
        <span>Celsius = </span>
        <input
          type="text"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
        />
        <span>Fahrenheit</span>
      </div>
      <p>
        <a
          href="https://github.com/scwood/7GUIs/blob/main/src/2-temperature-converter/TemperatureConverter.tsx"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
