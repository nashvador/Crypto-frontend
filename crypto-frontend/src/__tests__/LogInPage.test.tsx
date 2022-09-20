import { render, screen } from "@testing-library/react";
import SignIn from "../components/UserAuthentication/LogInPage";
import userEvent from "@testing-library/user-event";

describe("<SignIn />", () => {
  let container: HTMLElement | null;
  const user = null;
  const setUser = jest.fn();

  beforeEach(() => {
    container = render(<SignIn user={user} setUser={setUser} />).container;
  });

  afterEach(() => {
    container?.remove();
    container = null;
  });

  test("renders Sign in button", () => {
    const element = screen.getByText("Sign in");
    expect(element).toBeDefined();
  });
});
