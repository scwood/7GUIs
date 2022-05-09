import { MouseEventHandler, useReducer } from "react";

import styles from "./CircleDrawer.module.css";

let nextId = 0;

interface Circle {
  id: number;
  x: number;
  y: number;
  diameter: number;
}

interface State {
  circles: Circle[];
  undoStates: Circle[][];
  redoStates: Circle[][];
}

const initialState: State = { circles: [], undoStates: [], redoStates: [] };

type Action =
  | { type: "addCircle"; circle: Circle }
  | { type: "resizeCircle"; circleId: number; diameter: number }
  | { type: "undo" }
  | { type: "redo" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addCircle":
      return {
        undoStates: [...state.undoStates, state.circles],
        redoStates: [],
        circles: [...state.circles, action.circle],
      };
    case "resizeCircle":
      return {
        undoStates: [...state.undoStates, state.circles],
        redoStates: [],
        circles: state.circles.map((circle) => {
          return circle.id === action.circleId
            ? { ...circle, diameter: action.diameter }
            : circle;
        }),
      };
    case "undo":
      if (state.undoStates.length === 0) {
        return state;
      } else {
        const undoStates = [...state.undoStates];
        const circles = undoStates.pop() || [];
        return {
          undoStates,
          redoStates: [state.circles, ...state.redoStates],
          circles,
        };
      }
    case "redo":
      if (state.redoStates.length === 0) {
        return state;
      } else {
        const redoStates = [...state.redoStates];
        const circles = redoStates.shift() || [];
        return {
          undoStates: [...state.undoStates, state.circles],
          redoStates,
          circles,
        };
      }
  }
}

export function CircleDrawer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDrawingAreaClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const circle: Circle = {
      id: nextId++,
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
      diameter: 50,
    };
    dispatch({ type: "addCircle", circle });
  };

  const handleCircleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  function undo() {
    dispatch({ type: "undo" });
  }

  function redo() {
    dispatch({ type: "redo" });
  }

  return (
    <>
      <h2>6. Circle drawer</h2>
      <button onClick={undo} disabled={state.undoStates.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={state.redoStates.length === 0}>
        Redo
      </button>
      <div className={styles.container} onClick={handleDrawingAreaClick}>
        {state.circles.map((circle, i) => {
          return (
            <div
              key={i}
              className={styles.circle}
              style={{
                width: circle.diameter,
                height: circle.diameter,
                left: circle.x,
                top: circle.y,
              }}
              onClick={handleCircleClick}
            />
          );
        })}
      </div>
      <p>
        <a
          href="https://github.com/scwood/7GUIs/blob/main/src/6-circle-drawer/CircleDrawer.tsx"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
