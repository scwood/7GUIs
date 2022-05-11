import { MouseEventHandler, useReducer } from "react";

import styles from "./CircleDrawer.module.css";
import { ResizeModal } from "./ResizeModal";

let nextId = 0;

interface Circle {
  id: number;
  x: number;
  y: number;
  diameter: number;
}

interface CircleDrawerState {
  circles: Circle[];
  selectedCircle: Circle | null;
  undoStates: Circle[][];
  redoStates: Circle[][];
}

const initialCircleDrawerState: CircleDrawerState = {
  circles: [],
  selectedCircle: null,
  undoStates: [],
  redoStates: [],
};

type CircleDrawerActions =
  | { type: "addCircle"; circle: Circle }
  | { type: "selectCircle"; circle: Circle | null }
  | { type: "resizeCircle"; circle: Circle; diameter: number }
  | { type: "undo" }
  | { type: "redo" };

function reducer(
  state: CircleDrawerState,
  action: CircleDrawerActions
): CircleDrawerState {
  switch (action.type) {
    case "addCircle":
      return {
        ...state,
        undoStates: [...state.undoStates, state.circles],
        redoStates: [],
        circles: [...state.circles, action.circle],
      };
    case "selectCircle":
      return {
        ...state,
        selectedCircle: action.circle,
      };
    case "resizeCircle":
      return {
        ...state,
        undoStates: [...state.undoStates, state.circles],
        redoStates: [],
        circles: state.circles.map((circle) => {
          return circle.id === action.circle.id
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
          ...state,
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
          ...state,
          undoStates: [...state.undoStates, state.circles],
          redoStates,
          circles,
        };
      }
  }
}

export function CircleDrawer() {
  const [state, dispatch] = useReducer(reducer, initialCircleDrawerState);

  const handleDrawingAreaClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (state.selectedCircle) {
      dismissModal();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const circle: Circle = {
      id: nextId++,
      x: event.clientX - rect.x,
      y: event.clientY - rect.y,
      diameter: 30,
    };
    dispatch({ type: "addCircle", circle });
  };

  const handleCircleClick =
    (circle: Circle): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      event.stopPropagation();
      dispatch({
        type: "selectCircle",
        circle: state.selectedCircle?.id === circle.id ? null : circle,
      });
    };

  function dismissModal() {
    dispatch({ type: "selectCircle", circle: null });
  }

  function undo() {
    dispatch({ type: "undo" });
  }

  function redo() {
    dispatch({ type: "redo" });
  }

  function handleResize(diameter: number) {
    if (state.selectedCircle) {
      dispatch({
        type: "resizeCircle",
        diameter,
        circle: state.selectedCircle,
      });
    }
  }

  return (
    <>
      <h2>6. Circle drawer</h2>
      <div className={styles.buttonBar}>
        <button onClick={undo} disabled={state.undoStates.length === 0}>
          Undo
        </button>
        <button onClick={redo} disabled={state.redoStates.length === 0}>
          Redo
        </button>
      </div>
      <div className={styles.container} onClick={handleDrawingAreaClick}>
        <div className={styles.circles}>
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
                onClick={handleCircleClick(circle)}
              />
            );
          })}
        </div>
        {state.selectedCircle ? (
          <ResizeModal
            currentDiameter={state.selectedCircle.diameter}
            onChangeDiameter={handleResize}
            style={{
              position: "absolute",
              overflow: "overlay",
              top: state.selectedCircle.y + 5,
              left: state.selectedCircle.x + 5,
            }}
          />
        ) : null}
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
