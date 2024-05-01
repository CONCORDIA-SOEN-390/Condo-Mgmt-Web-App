// Import the function to be tested
import { POST } from "../src/app/api/getUnitFeesByUserId/route";

// Mock the Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [{ unit_id: 11, property_id: 1, condo_fee: null }], // This can be customized for different scenarios
            error: null, // This can be customized for different scenarios
          })),
        })),
      })),
    })),
  })),
}));

describe("POST function", () => {
  it("should return fees when ownerId exists", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ ownerId: 1 }),
    };

    const response = await POST(req);

    expect(response.status).toBe(200);
    //expect(response.headers["Content-Type"]).toBe("application/json");
    // You can add more specific assertions based on your expected response
  });

  it("should return 500 error when Supabase client returns an error", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ ownerId: "someOwnerId" }),
    };

    const mockError = new Error("Supabase error");

    // Override the mocked Supabase client function to return an error
    require("@supabase/supabase-js").createClient.mockImplementation(() => ({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              error: mockError,
            })),
          })),
        })),
      })),
    }));

    const response = await POST(req);

    expect(response.status).toBe(500);
    expect(response.body).toBe(JSON.stringify("Supabase error"));
    // You can add more specific assertions based on your expected error response
  });

  // Add more test cases as needed for edge cases, error handling, etc.
});
