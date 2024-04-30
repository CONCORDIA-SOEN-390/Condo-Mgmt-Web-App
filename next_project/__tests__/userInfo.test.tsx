import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserContext, UserInfoProvider } from "../src/context/userInfoContext";

describe("<UserInfoProvider />", () => {
  test("renders without crashing", () => {
    render(
      <UserInfoProvider>
        <div>Child Component</div>
      </UserInfoProvider>
    );
  });

  test("context has default values", () => {
    const { getByText } = render(
      <UserContext.Consumer>
        {(context: any) => (
          <div>
            <span>UserID: {context.userId}</span>
            <span>Email: {context.email}</span>
          </div>
        )}
      </UserContext.Consumer>
    );

    expect(getByText("UserID: 0")).toBeInTheDocument();
    expect(getByText("Email:")).toBeInTheDocument();
  });

  test("context values update correctly", () => {
    const { getByText } = render(
      <UserInfoProvider>
        <UserContext.Consumer>
          {(context: any) => (
            <div>
              <button onClick={() => context.changeId(123)}>
                Change UserID
              </button>
              <button onClick={() => context.changeEmail("test@example.com")}>
                Change Email
              </button>
            </div>
          )}
        </UserContext.Consumer>
      </UserInfoProvider>
    );

    fireEvent.click(getByText("Change UserID"));
    fireEvent.click(getByText("Change Email"));

    expect(getByText("UserID: 123")).toBeInTheDocument();
    expect(getByText("Email: test@example.com")).toBeInTheDocument();
  });

  // Add more test cases as needed...
});
