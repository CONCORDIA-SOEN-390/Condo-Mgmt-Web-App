const { POST } = require("../src/app/api/getUnitFeesByUserId/route"); // Update with your file name
const { createClient } = require("@supabase/supabase-js");
export {};

// Mocking Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("POST function", () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    jest.clearAllMocks();
  });

  it("should return fees data when ownerId is provided", async () => {
    const mockJson = jest.fn().mockResolvedValue({ ownerId: "123" });
    const mockResponse = {
      json: mockJson,
    };
    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ unit_id: 1, property_id: 1, condo_fee: 100 }],
    });
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockResponse);

    expect(mockSupabase.from).toHaveBeenCalledWith("unit");
    expect(mockSupabase.from().select).toHaveBeenCalledWith(
      "unit_id, property_id, condo_fee"
    );
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "owner_id",
      "123"
    );
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "occupied",
      true
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([
      { unit_id: 1, property_id: 1, condo_fee: 100 },
    ]);
  });

  it("should return 500 status and error message when there is an error in Supabase query", async () => {
    const mockJson = jest.fn().mockResolvedValue({ ownerId: "123" });
    const mockResponse = {
      json: mockJson,
    };
    const mockError = new Error("Mock Supabase error");
    const mockSelect = jest.fn().mockRejectedValue(mockError);
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockResponse);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Internal Server Error");
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
