export function Cells() {
  return (
    <>
      <h2>7. Cells</h2>
      <div></div>
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

function createCells() {
  const result = [];
  for (let x = 0; x < 99; x++) {
    let row = [];
    for (let y = 0; y < 26; y++) {
      row.push("");
    }
    result.push(row);
  }
  return result;
}
