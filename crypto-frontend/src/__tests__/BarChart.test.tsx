import React from "react";
import { render, screen } from "@testing-library/react";
import BarChart from "../components/FrontPage/BTCBarChart";
import userEvent from "@testing-library/user-event";

describe("<BarChart />", () => {
  let container: HTMLElement | null;
  const currency = "usd";

  beforeEach(() => {
    container = render(<BarChart currency={currency} />).container;
  });

  afterEach(() => {
    container?.remove();
    container = null;
  });

  test("renders button", () => {
    const element = screen.getByText("7 days");
    expect(element).toBeDefined();
  });

  test("button is clickable", async () => {
    const mockHandler = jest.fn();
    const element = screen.getByText("7 days");
    const user = userEvent.setup();

    await user.click(element);

    expect(mockHandler.mock.calls).toHaveLength(1);

    screen.debug();
  });
});
