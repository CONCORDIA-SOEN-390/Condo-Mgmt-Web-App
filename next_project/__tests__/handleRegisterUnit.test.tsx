const { POST } = require("../src/app/api/handleRegisterUnit/route");
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

  it("should update unit successfully when userId and regKey are provided and regKey exists", async () => {
    const mockBody = { userId: "123", regKey: "abc123" };
    const mockJson = jest.fn().mockResolvedValue(mockBody);
    const mockReq = {
      json: mockJson,
    };

    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: [{ unit_id: 1, property_id: "123" }] });
    const mockUpdate = jest.fn().mockResolvedValue({
      data: [{ unit_id: 1, owner_id: "123", occupied: true }],
    });
    const mockFrom = jest.fn(() => ({
      select: mockSelect,
      update: mockUpdate,
    }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockReq);

    expect(mockSupabase.from).toHaveBeenCalledWith("unit");
    expect(mockSupabase.from().select).toHaveBeenCalledWith("*");
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "registration_key",
      "abc123"
    );
    expect(mockSupabase.from().update).toHaveBeenCalledWith({
      owner_id: "123",
      occupied: true,
    });
    expect(mockSupabase.from().update().eq).toHaveBeenCalledWith("unit_id", 1);
    expect(mockSupabase.from().update().eq).toHaveBeenCalledWith(
      "property_id",
      "123"
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Registration key updated successfully");
  });

  it("should return 404 status and error message when regKey does not exist", async () => {
    const mockBody = { userId: "123", regKey: "abc123" };
    const mockJson = jest.fn().mockResolvedValue(mockBody);
    const mockReq = {
      json: mockJson,
    };

    const mockSelect = jest.fn().mockResolvedValue({ data: [] });
    const mockFrom = jest.fn(() => ({ select: mockSelect }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockReq);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Key does not exist");
  });

  it("should return 500 status and error message when there is an error in Supabase update query", async () => {
    const mockBody = { userId: "123", regKey: "abc123" };
    const mockJson = jest.fn().mockResolvedValue(mockBody);
    const mockReq = {
      json: mockJson,
    };

    const mockSelect = jest
      .fn()
      .mockResolvedValue({ data: [{ unit_id: 1, property_id: "123" }] });
    const mockError = new Error("Mock Supabase error");
    const mockUpdate = jest.fn().mockRejectedValue(mockError);
    const mockFrom = jest.fn(() => ({
      select: mockSelect,
      update: mockUpdate,
    }));
    const mockSupabase = {
      from: mockFrom,
    };
    createClient.mockReturnValue(mockSupabase);

    const response = await POST(mockReq);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Internal Server Error");
  });

  it("should return 500 status and error message when req.json() throws an error", async () => {
    const mockJson = jest
      .fn()
      .mockRejectedValue(new Error("Mock request JSON error"));
    const mockReq = {
      json: mockJson,
    };

    const response = await POST(mockReq);

    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Internal Server Error");
  });
});
