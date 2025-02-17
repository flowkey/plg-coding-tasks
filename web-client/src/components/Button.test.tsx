import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders button with label and handles click", () => {
  const handleClick = jest.fn();

  render(<Button label="Click Me" onClick={handleClick} />);

  const button = screen.getByText("Click Me");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
