// Import the function to be tested
import { POST } from "../src/app/api/handleLockerRegistration/route";

// Mock the Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn((table) => {
      if (table === "locker") {
        return {
          select: jest.fn(() => ({
            eq: jest.fn(() => ({
              eq: jest.fn(() => ({
                data: [
                  {
                    locker_id: 1,
                    property_id: 1,
                    owner_id: 1,
                    condo_fee: 50.0,
                    occupied: true,
                  },
                ], // Customize this for different scenarios
                error: null, // This can be customized for different scenarios
              })),
            })),
          })),
          update: jest.fn(() => ({
            eq: jest.fn(() => ({
              eq: jest.fn(() => ({
                data: [], // Customize this for different scenarios
                error: null, // This can be customized for different scenarios
              })),
            })),
          })),
        };
      }
    }),
  })),
}));

describe("POST function", () => {
  it("should update locker details when propertyId and lockerOwnerId exist", async () => {
    // Mock the request object with propertyId and lockerOwnerId
    const req = {
      json: jest.fn().mockResolvedValue({
        propertyId: 1,
        lockerOwnerId: 1,
        lockerId: 1,
      }),
    };

    // Override the mocked Supabase client function to return a free locker
    require("@supabase/supabase-js").createClient.mockImplementation(() => ({
      from: jest.fn((table) => {
        if (table === "locker") {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  data: [{ locker_id: 1, property_id: 1, occupied: false }], // A free locker
                  error: null,
                })),
              })),
            })),
            update: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  data: [
                    {
                      locker_id: 1,
                      property_id: 1,
                      owner_id: 1,
                      occupied: true,
                    },
                  ], // Updated locker data
                  error: null,
                })),
              })),
            })),
          };
        }
      }),
    }));

    // Call the POST function
    const response = await POST(req);

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // You can add more specific assertions based on your expected response
  });

  it("should return 400 error when all lockers are occupied", async () => {
    // Mock the request object with propertyId and lockerOwnerId
    const req = {
      json: jest.fn().mockResolvedValue({
        propertyId: 1,
        lockerOwnerId: 1,
      }),
    };

    // Override the mocked Supabase client function to return all lockers occupied
    require("@supabase/supabase-js").createClient.mockImplementation(() => ({
      from: jest.fn((table) => {
        if (table === "locker") {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  data: [{ locker_id: 1, property_id: 1, occupied: true }], // All lockers are occupied
                  error: null,
                })),
              })),
            })),
          };
        }
      }),
    }));

    // Call the POST function
    const response = await POST(req);

    // Check if the response status is 400
    expect(response.status).toBe(400);

    // You can add more specific assertions based on your expected error response
  });

  it("should return 500 error when Supabase client returns an error during update", async () => {
    // Mock the request object with propertyId and lockerOwnerId
    const req = {
      json: jest.fn().mockResolvedValue({
        propertyId: 1,
        lockerOwnerId: 1,
      }),
    };

    // Simulate an error from Supabase client during update
    const mockError = new Error("Supabase error during update");
    // Override the mocked Supabase client function to return an error during update
    require("@supabase/supabase-js").createClient.mockImplementation(() => ({
      from: jest.fn((table) => {
        if (table === "locker") {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  data: [
                    {
                      locker_id: 1,
                      property_id: 1,
                      occupied: true,
                    },
                  ], // Mock locker data
                  error: null,
                })),
              })),
            })),
            update: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  error: mockError, // Simulate error during update
                })),
              })),
            })),
          };
        }
      }),
    }));

    // Call the POST function
    const response = await POST(req);

    // Check if the response status is 500
    expect(response.status).toBe(500);

    // You can add more specific assertions based on your expected error response
  });

  // Add more test cases as needed for edge cases, error handling, etc.
});
