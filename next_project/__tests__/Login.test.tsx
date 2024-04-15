// // Import necessary dependencies
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
// import LoginSignupForm from "@/components/LoginPageComponents/LoginForm";
// import { useFormState } from "react-dom";
// import React from "react"; // Import React for JSX usage

// // Define interface for props
// interface LoginSignupFormProps {
//   formType: "Signup" | "Login";
// }

// // Mock the useFormState hook
// jest.mock("react-dom", () => ({
//   ...jest.requireActual("react-dom"),
//   useFormState: jest.fn(),
// }));

// describe("LoginSignupForm", () => {
//   test("renders Signup form correctly with mocked state", () => {
//     // Mock the state with no validation errors
//     const mockState = {
//       errors: {},
//     };

//     // Mock the form submission function
//     const mockSubmitFunction = jest.fn();

//     // Mock the useFormState hook to return the mock state and the form submission function
//     (useFormState as jest.Mock).mockReturnValue([
//       mockState,
//       mockSubmitFunction,
//     ]);

//     render(<LoginSignupForm formType="Signup" />);

//     // Check if the form elements are present
//     expect(screen.getByLabelText("Email address*")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password*")).toBeInTheDocument();

//     // Fill in the form with valid data
//     userEvent.type(screen.getByLabelText("Email address*"), "test@example.com");
//     userEvent.type(screen.getByLabelText("Password*"), "password123");

//     // Submit the form
//     fireEvent.submit(screen.getByRole("button", { name: "Sign Up" }));

//     // Check if the form submission function is called
//     expect(mockSubmitFunction).not.toHaveBeenCalled();
//   });

//   test("displays email validation error in Signup form", async () => {
//     // Mock the state with an email validation error
//     const mockState = {
//       errors: {
//         email: ["Invalid email address"],
//       },
//     };

//     // Mock the useFormState hook to return the mock state
//     (useFormState as jest.Mock).mockReturnValue([mockState, jest.fn()]);

//     render(<LoginSignupForm formType="Signup" />);

//     // Check if the error message is displayed
//     expect(screen.getByText("Invalid email address")).toBeInTheDocument();
//   });

//   test("displays password validation errors in Signup form", async () => {
//     // Mock the state with password validation errors
//     const mockState = {
//       errors: {
//         password: ["Password is too short", "Password must contain a digit"],
//       },
//     };

//     // Mock the useFormState hook to return the mock state
//     (useFormState as jest.Mock).mockReturnValue([mockState, jest.fn()]);

//     render(<LoginSignupForm formType="Signup" />);

//     // Check if the error messages are displayed
//     expect(screen.getByText("Password is too short")).toBeInTheDocument();
//     expect(
//       screen.getByText("Password must contain a digit")
//     ).toBeInTheDocument();
//   });

//   test("renders Signup form correctly", () => {
//     render(<LoginSignupForm formType="Signup" />);

//     // Check if the signup form is rendered
//     expect(screen.getByText("Create an account")).toBeInTheDocument();
//     expect(screen.getByLabelText("Email address*")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password*")).toBeInTheDocument();
//     expect(screen.getByRole("button")).toHaveTextContent("Sign Up");
//   });

//   //LOG IN TEST
//   test("renders Login form correctly with mocked error state", () => {
//     // Mock the state with a login error
//     const mockState = {
//       errors: {
//         login: "Invalid email or password", // Assume the error is returned under the 'login' key
//       },
//     };

//     // Mock the form submission function
//     const mockSubmitFunction = jest.fn();

//     // Mock the useFormState hook to return the mock state and the form submission function
//     (useFormState as jest.Mock).mockReturnValue([
//       mockState,
//       mockSubmitFunction,
//     ]);

//     render(<LoginSignupForm formType="Login" />);

//     // Check if the form elements are present
//     expect(screen.getByLabelText("Email address*")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password*")).toBeInTheDocument();

//     // Fill in the form with invalid data
//     userEvent.type(
//       screen.getByLabelText("Email address*"),
//       "invalid@example.com"
//     );

//     // Submit the form
//     fireEvent.submit(screen.getByRole("button", { name: "Sign in" }));

//     // Ensure that the form submission function is not called
//     expect(mockSubmitFunction).not.toHaveBeenCalled();
//   });
// });
