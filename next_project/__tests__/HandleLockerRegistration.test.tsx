const { POST } = require("../src/app/api/handleLockerRegistration/route"); // Update with your file name
const { createClient } = require("@supabase/supabase-js");

// Mocking Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("POST function", () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation
    jest.clearAllMocks();
  });

  it("should update locker successfully when propertyId and lockerOwnerId are provided and locker is available", async () => {
    const mockBody = { propertyId: "123", lockerOwnerId: "456" };
    const mockJson = jest.fn().mockResolvedValue(mockBody);
    const mockReq = {
      json: mockJson,
    };

    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ locker_id: 1, property_id: "123", occupied: false }],
    });
    const mockUpdate = jest.fn().mockResolvedValue({
      data: [{ locker_id: 1, owner_id: "456", occupied: true }],
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

    expect(mockSupabase.from).toHaveBeenCalledWith("locker");
    expect(mockSupabase.from().select).toHaveBeenCalledWith("*");
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "property_id",
      "123"
    );
    expect(mockSupabase.from().select().eq).toHaveBeenCalledWith(
      "occupied",
      false
    );
    expect(mockSupabase.from().update).toHaveBeenCalledWith({
      owner_id: "456",
      occupied: true,
    });
    expect(mockSupabase.from().update().eq).toHaveBeenCalledWith(
      "locker_id",
      1
    );
    expect(mockSupabase.from().update().eq).toHaveBeenCalledWith(
      "property_id",
      "123"
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Locker updated succcessfully");
  });

  it("should return 400 status and error message when all lockers are filled", async () => {
    const mockBody = { propertyId: "123", lockerOwnerId: "456" };
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

    expect(response.status).toBe(400);
    expect(await response.text()).toBe("All spaces filled");
  });

  it("should return 500 status and error message when there is an error in Supabase update query", async () => {
    const mockBody = { propertyId: "123", lockerOwnerId: "456" };
    const mockJson = jest.fn().mockResolvedValue(mockBody);
    const mockReq = {
      json: mockJson,
    };

    const mockSelect = jest.fn().mockResolvedValue({
      data: [{ locker_id: 1, property_id: "123", occupied: false }],
    });
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
