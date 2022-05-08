import styles from "./ProgressBar.module.css";

export interface ProgressBarProps {
  /** A number between 1-100 */
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.outer} role="progressbar">
      <div className={styles.inner} style={{ width: `${progress}%` }}></div>
    </div>
  );
}
