import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Counter } from "./Counter";

test("Clicking the button should increase the count by 1", () => {
  render(<Counter />);

  const button = screen.getByRole("button");
  const textbox = screen.getByRole("textbox");

  expect(textbox).toHaveValue("0");
  userEvent.click(button);
  expect(textbox).toHaveValue("1");
  userEvent.click(button);
  expect(textbox).toHaveValue("2");
});

test("Text field should be read only", () => {
  render(<Counter />);
  expect(screen.getByRole("textbox")).toHaveProperty("disabled");
});
