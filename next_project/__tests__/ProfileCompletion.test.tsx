import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProfileCompletionForm from "../src/components/CompleteProfileComponents/ProfileCompletionForm";

describe("ProfileCompletionForm", () => {
  test("renders form fields correctly", () => {
    render(<ProfileCompletionForm />);
    // Test that all form fields are rendered correctly
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Phone Number (nnn-nnn-nnnn)")
    ).toBeInTheDocument();
    expect(screen.getByText("Individual")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Profile Picture")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  test("allows input in form fields", () => {
    render(<ProfileCompletionForm />);
    // Test input field functionality
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Phone Number (nnn-nnn-nnnn)"),
      { target: { value: "123-456-7890" } }
    );
    expect(screen.getByPlaceholderText("Username")).toHaveValue("testuser");
    expect(
      screen.getByPlaceholderText("Phone Number (nnn-nnn-nnnn)")
    ).toHaveValue("123-456-7890");
  });

  test("handles form submission correctly", async () => {
    render(<ProfileCompletionForm />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Phone Number (nnn-nnn-nnnn)"),
      { target: { value: "123-456-7890" } }
    );
    fireEvent.click(screen.getByText("Individual"));

    fireEvent.click(screen.getByText("Submit"));

    // You might need to mock the API response to test the success and error cases
    // Here, for simplicity, we're just checking if the submission attempt is made
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/signupsteptwo",
        expect.any(Object)
      );
    });
  });

  // Add more test cases as needed...
});
