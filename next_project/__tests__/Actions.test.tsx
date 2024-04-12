import completeSignup from "@/app/(auth)/signup/complete/page";
//import { FormData } from 'your-mock-library'; // Replace with a suitable library for mocking FormData

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("verifyUserSignUp", () => {
  it("should return errors for invalid email", async () => {
    const prevState = {};
    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "ValidPassword1!");

    const result = await completeSignup(prevState, formData);

    expect(result.errors?.email).toContain("Invalid Email");
  });

  it("should return errors for invalid password", async () => {
    const prevState = {};
    const formData = new FormData();
    formData.append("email", "valid@example.com");
    formData.append("password", "short");

    const result = await verifyUserSignUp(prevState, formData);

    expect(result.errors?.password).toContain(
      "Password must be at least 8 characters long"
    );
    expect(result.errors?.password).toContain(
      "Password must contain at least 1 number, 1 special character, and 1 capital letter"
    );
  });

  it("should redirect for valid form data", async () => {
    const prevState = {};
    const formData = new FormData();
    formData.append("email", "valid@example.com");
    formData.append("password", "ValidPassword1!");

    await completeSignup(prevState, formData);

    // Assuming redirect is mocked
    const redirectMock = require("next/navigation").redirect;

    // Ensure that redirect was called
    //expect(redirectMock).toHaveBeenCalledWith("/signup/complete");

    // Ensure that redirect was called only once
    expect(redirectMock).toHaveBeenCalledTimes(1);
  });
});
