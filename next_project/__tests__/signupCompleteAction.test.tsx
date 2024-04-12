import { CompleteProfileVerification } from "../src/actions/SignupCompleteAction"; // Import the function to be tested

describe("CompleteProfileVerification function", () => {
  test("returns errors when form data is invalid", async () => {
    // Mock invalid form data
    const formData = new FormData();
    formData.append("username", ""); // Invalid username
    formData.append("phoneNumber", "1234567890"); // Invalid phone number format
    formData.append("userType", "admin"); // Invalid user type

    // Call the function with invalid form data
    const result = await CompleteProfileVerification(null, formData);

    // Assert that errors are returned
    expect(result).toHaveProperty("errors");
    expect(result?.errors).toHaveProperty("username");
    expect(result?.errors).toHaveProperty("phone");
    expect(result?.errors).toHaveProperty("userType");
  });

  test("performs DB calls with valid form data", async () => {
    // Mock valid form data
    const formData = new FormData();
    formData.append("username", "john_doe");
    formData.append("phoneNumber", "123-456-7890");
    formData.append("userType", "reg_user");

    // Mock database calls (you may need to use a mock database library or mock pool object)
    const mockDBCall = jest.fn();

    // Mock schema to always return success
    jest.mock("zod", () => ({
      object: jest.fn().mockReturnValue({
        safeParse: jest.fn().mockReturnValue({ success: true }),
      }),
    }));

    // Call the function with valid form data
    await CompleteProfileVerification(null, formData);

    // Assert that database calls are made with validated fields
    expect(mockDBCall).toHaveBeenCalledWith(/*/* validated fields */);
  });
});
