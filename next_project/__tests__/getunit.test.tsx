// Import the required modules for testing
import "isomorphic-fetch";
const { POST } = require("../src/app/api/getUnitDetails/route");
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

  it("should return unit data when provided valid unitId and propertyId", async () => {
    // Mock the request object
    const req = {
      json: jest.fn().mockResolvedValue({ unitId: 11, propertyId: 1 }),
    };

    // Mock the Supabase client response
    const unitData = { property_id: 1, unit_id: 11 };
    const supabaseMock = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: [unitData], error: null }),
    };
    createClient.mockReturnValue(supabaseMock);

    // Call the POST function
    const response = await POST(req);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(JSON.stringify([unitData]));
  });

  it("should return status 500 and error message when Supabase client returns an error", async () => {
    // Mock the request object
    const req = {
      json: jest.fn().mockResolvedValue({ unitId: 1, propertyId: 1 }),
    };

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
    expect(response.body).toEqual(JSON.stringify("Internal Server Error"));
  });
});
