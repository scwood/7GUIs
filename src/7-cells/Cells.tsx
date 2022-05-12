import { tokenize } from "./tokenize";

export function Cells() {
  try {
    console.log(tokenize("SUM(1, DIVIDE(10, A99.9))"));
  } catch (error) {
    console.error(error);
  }
  return (
    <>
      <h2>7. Cells</h2>
      <p>
        <a
          href="https://github.com/scwood/7GUIs/blob/main/src/7-cells/Cells.tsx"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </>
  );
}
