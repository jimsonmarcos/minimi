// import react-testing methods
import { fireEvent, render, screen } from "@testing-library/react";
// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
// import userEvent from "@testing-library/user-event";
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";
// the component to test
import Home from "@/app/page";

test("loads and landing page", async () => {
  // Render a React element into the DOM
  render(<Home />);

  // Companies header text is visible
  expect(screen.getByText("Companies"));
  // Company Table is visible
  expect(screen.findByTestId("datatable"));

  // Table view button is visible
  expect(screen.getByLabelText("Table"));
  // Grid view button is visible
  expect(screen.getByLabelText("Grid"));
});

test("can switch from table view to grid View", async () => {
  // Render a React element into the DOM
  render(<Home />);

  // Click Grid view button
  fireEvent.click(screen.getByText("Grid"));

  // Companies table is hidden
  expect(!screen.findByTestId("datatable"));

  // Grid view is visible
  expect(screen.findByTestId("datagrid"));
});
