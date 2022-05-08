import { useState } from "react";
import styles from "./FlightBooker.module.css";

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;

enum FlightType {
  OneWay = "one-way flight",
  RoundTrip = "round trip flight",
}

function getTodayDateString() {
  const [dateString] = new Date().toISOString().split("T");
  return dateString;
}

export function FlightBooker() {
  const [flightType, setFlightType] = useState<FlightType>(FlightType.OneWay);
  const [startDateString, setStartDateString] = useState(getTodayDateString());
  const [endDateString, setEndDateString] = useState(getTodayDateString());

  const isStartDateValid = dateRegex.test(startDateString);
  const isEndDateValid = dateRegex.test(endDateString);

  let enableBookButton;
  if (flightType === FlightType.OneWay) {
    enableBookButton = isStartDateValid;
  } else {
    enableBookButton =
      isStartDateValid && isEndDateValid && startDateString <= endDateString;
  }

  function showBooking() {
    if (flightType === FlightType.OneWay) {
      alert(`You booked a ${flightType} for ${startDateString}`);
    } else {
      alert(
        `You booked a ${flightType} from ${startDateString} to ${endDateString}`
      );
    }
  }

  return (
    <>
      <h2>3. Flight booker</h2>
      <div className={styles.form}>
        <select
          onChange={(event) => setFlightType(event.target.value as FlightType)}
          value={flightType}
        >
          <option value={FlightType.OneWay}>{FlightType.OneWay}</option>
          <option value={FlightType.RoundTrip}>{FlightType.RoundTrip}</option>
        </select>
        <input
          type="text"
          className={!isStartDateValid ? styles.invalid : undefined}
          value={startDateString}
          onChange={(event) => setStartDateString(event.target.value)}
        />
        <input
          type="text"
          className={
            !isEndDateValid && flightType === FlightType.RoundTrip
              ? styles.invalid
              : undefined
          }
          value={endDateString}
          disabled={flightType === FlightType.OneWay}
          onChange={(event) => setEndDateString(event.target.value)}
        />
        <button onClick={showBooking} disabled={!enableBookButton}>
          Book
        </button>
      </div>
      <p>
        <a
          href="https://github.com/scwood/7GUIs/blob/main/src/3-flight-booker/FlightBooker.tsx"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
