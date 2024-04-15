// Import necessary modules and functions
const { POST } = require("../src/app/api/handleLockerRegistration/route"); // Replace 'yourFileName' with the actual filename

// Mock the Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              limit: jest.fn(() => ({
                data: [{ property_id: 1, locker_id: 1, occupied: true }], // Mock empty data array for select query
                error: null, // Mock no error
              })),
            })),
          })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: {}, // Mock empty data object for update query
            error: null, // Mock no error
          })),
        })),
      })),
    })),
  })),
}));

describe("POST function", () => {
  it("should return success message when locker is available and registration is successful", async () => {
    const req = {
      json: jest.fn(() => ({
        propertyId: 1,
        lockerOwnerId: 1,
        lockerId: 1,
      })),
    };
    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Locker registered successfully");
  });

  it('should return "Locker not found or already occupied" when locker is not available', async () => {
    const req = {
      json: jest.fn(() => ({
        propertyId: "yourPropertyId",
        lockerOwnerId: "yourLockerOwnerId",
        lockerId: "yourOccupiedLockerId",
      })),
    };
    const response = await POST(req);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Locker not found or already occupied");
  });

  it("should return status 500 and error message when there is an error in Supabase select query", async () => {
    // Mocking Supabase select query error
    require("@supabase/supabase-js").createClient.mockImplementation(() => ({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            limit: jest.fn(() => ({
              data: null, // Mock no data
              error: { message: "Select query error" }, // Mock error message
            })),
          })),
        })),
      })),
    }));

    const req = {
      json: jest.fn(() => ({
        propertyId: "yourPropertyId",
        lockerOwnerId: "yourLockerOwnerId",
        lockerId: "yourLockerId",
      })),
    };
    const response = await POST(req);
    expect(response.status).toBe(500);
    expect(await response.text()).toBe(
      JSON.stringify({ message: "Select query error" })
    );
  });

  // Add more test cases for other scenarios like Supabase update query error, internal server error, etc.
});
