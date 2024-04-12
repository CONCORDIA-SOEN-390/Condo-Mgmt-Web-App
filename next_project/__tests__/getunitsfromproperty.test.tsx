const { GET } = require("../src/app/api/getunitsfromproperty/route"); // Update with your file name
const { createClient } = require("@supabase/supabase-js");

// Mocking Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("GET function", () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    jest.clearAllMocks();
  });

  it("should return units data when property_id is provided", async () => {
    const mockNextUrl = new URL("http://example.com/?property_id=123");
    const mockReq = {
      nextUrl: mockNextUrl,
    };
    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ unit_id: 1, property_id: 123, other_field: "value" }],
    });
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await GET(mockReq);

    expect(mockSupabase.from).toHaveBeenCalledWith("unit");
    expect(mockSupabase.from().select).toHaveBeenCalledWith("*");
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "property_id",
      "123"
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([
      { unit_id: 1, property_id: 123, other_field: "value" },
    ]);
  });

  it("should return 400 status and error message when property_id is missing", async () => {
    const mockNextUrl = new URL("http://example.com/");
    const mockReq = {
      nextUrl: mockNextUrl,
    };

    const response = await GET(mockReq);

    expect(response.status).toBe(400);
    expect(await response.text()).toBe(
      "Missing property_id or unit_id parameter"
    );
  });

  it("should return 500 status and error message when there is an error in Supabase query", async () => {
    const mockNextUrl = new URL("http://example.com/?property_id=123");
    const mockReq = {
      nextUrl: mockNextUrl,
    };
    const mockError = new Error("Mock Supabase error");
    const mockSelect = jest.fn().mockRejectedValue(mockError);
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await GET(mockReq);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Internal Server Error");
  });
});
