const { POST } = require("../src/app/api/getUnitDetails/route");
const { createClient } = require("@supabase/supabase-js");
export {};

// Mock Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("POST function", () => {
  let mockResponse: any;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Valid Request with Existing Unit", async () => {
    const req = {
      json: async () => ({
        unitId: 11,
        propertyId: 1,
      }),
    };

    await POST(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("Internal Server Error (Supabase Query Fails)", async () => {
    const req = {
      json: async () => ({
        unitId: "1",
        propertyId: "1",
      }),
    };

    const mockSupabaseQuery = jest
      .fn()
      .mockRejectedValue(new Error("Supabase query failed"));

    createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: mockSupabaseQuery,
          })),
        })),
      })),
    });

    await POST(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith("Internal Server Error");
  });

  it("should return 500 status and error message when req.json() throws an error", async () => {
    const mockJson = jest
      .fn()
      .mockRejectedValue(new Error("Mock request JSON error"));
    const mockResponse = {
      json: mockJson,
    };

    const response = await POST(mockResponse);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Internal Server Error");
  });
});
