import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("<NavBar />", () => {
  let container: HTMLElement | null;
  const currency = "usd";
  const user = null;
  const setCurrency = jest.fn();
  const setUser = jest.fn();

  beforeEach(() => {
    container = render(
      <Router>
        <NavBar
          currency={currency}
          user={user}
          setCurrency={setCurrency}
          setUser={setUser}
        />
      </Router>
    ).container;
  });

  afterEach(() => {
    container?.remove();
    container = null;
  });

  test("renders NavBartext", () => {
    const element = screen.getByText("CoinNOW");
    expect(element).toBeDefined();
  });
});
