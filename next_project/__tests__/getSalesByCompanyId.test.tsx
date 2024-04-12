// Import the required modules for testing
const { POST } = require("../src/app/api/getSalesByCompanyId/route"); // Assuming this file is named "file.js"
const { createClient } = require("@supabase/supabase-js");
export {};
// Mock the Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("POST route", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
  });

  it("should return sales data when provided a valid userId", async () => {
    // Mock the request object
    const req = { json: jest.fn().mockResolvedValue({ userId: 1 }) };

    // Mock the Supabase client response
    const salesData = [{ id: 1 }];
    const supabaseMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: salesData, error: null }),
    };
    createClient.mockReturnValue(supabaseMock);

    // Call the POST function
    const response = await POST(req);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.headers["Content-Type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify(salesData));
  });

  it("should return status 500 and error message when Supabase client returns an error", async () => {
    // Mock the request object
    const req = { json: jest.fn().mockResolvedValue({ userId: 1 }) };

    // Mock the Supabase client response with an error
    const errorMessage = "Supabase error";
    const supabaseMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: null, error: errorMessage }),
    };
    createClient.mockReturnValue(supabaseMock);

    // Call the POST function
    const response = await POST(req);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual(JSON.stringify(errorMessage));
  });

  it("should return status 500 and error message when an internal server error occurs", async () => {
    // Mock the request object
    const req = {
      json: jest.fn().mockRejectedValue(new Error("Internal Server Error")),
    };

    // Call the POST function
    const response = await POST(req);

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual("Internal Server Error");
  });
});
