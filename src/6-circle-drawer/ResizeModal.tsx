import { CSSProperties, MouseEventHandler, useState } from "react";

import styles from "./ResizeModal.module.css";

export interface ResizeModalProps {
  style?: CSSProperties;
  currentDiameter: number;
  onChangeDiameter: (diameter: number) => void;
}

export function ResizeModal({
  onChangeDiameter: onResize,
  currentDiameter,
  style,
}: ResizeModalProps) {
  const [showResizeControls, setShowResizeControls] = useState(false);

  const showControls: MouseEventHandler<HTMLButtonElement> = (event) => {
    setShowResizeControls(true);
  };

  return (
    <div
      style={style}
      className={styles.modal}
      onClick={(event) => event.stopPropagation()}
    >
      {showResizeControls ? (
        <input
          type="range"
          value={currentDiameter}
          onChange={(event) => onResize?.(parseInt(event.target.value))}
        />
      ) : (
        <button onClick={showControls}>Adjust diameter</button>
      )}
    </div>
  );
}
