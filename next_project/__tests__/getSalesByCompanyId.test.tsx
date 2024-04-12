const { POST } = require("../src/app/api/getSalesByCompanyId/route");
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

  it("should return sales data when userId is provided", async () => {
    const mockJson = jest.fn().mockResolvedValue({ userId: "123" });
    const mockResponse = {
      json: mockJson,
    };
    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ id: 1, product: "Product A", price: 100 }],
    });
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockResponse);

    expect(mockSupabase.from).toHaveBeenCalledWith("sale");
    expect(mockSupabase.from().select).toHaveBeenCalledWith("*");
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "old_owner_id",
      "123"
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([
      { id: 1, product: "Product A", price: 100 },
    ]);
  });

  it("should return 500 status and error message when there is an error in Supabase query", async () => {
    const mockJson = jest.fn().mockResolvedValue({ userId: "123" });
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
