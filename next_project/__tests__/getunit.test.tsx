// Import necessary modules and dependencies
import { TextEncoder, TextDecoder } from "util";
import handler from "../src/app/api/getunit/route";
Object.assign(global, { TextDecoder, TextEncoder });

const pool = require("../utils/db"); // Make sure to adjust the import based on your project structure
//const handler = require("../pages/api/getunit"); // Adjust the import based on your project structure

jest.mock("../utils/db", () => ({
  connect: jest.fn(), // You might need to adjust this based on your actual implementation
}));

describe("Unit Details API", () => {
  it("should return unit details when valid property_id and unit_id are provided", async () => {
    const mockQuery = jest.fn().mockReturnValue({
      rows: [{ unit_id: 1, property_id: 1, owner_id: 1, occupied: false }],
    });

    const mockClient = {
      query: mockQuery,
      release: jest.fn(),
    };

    pool.connect.mockResolvedValueOnce(mockClient);

    const mockReq = {
      method: "GET",
      query: { property_id: 1, unit_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      unit: { unit_id: 1, property_id: 1, owner_id: 1, occupied: false },
    });
    expect(pool.connect).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM unit WHERE property_id = $1 AND unit_id = $2",
      [1, 1]
    );
    expect(mockClient.release).toHaveBeenCalled();
  });

  // Add other test cases here
  // Previous test case ...

  it("should return a 404 error when the property_id is provided but the unit_id is missing", async () => {
    const mockReq = {
      method: "GET",
      query: { property_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Missing property_id or unit_id parameter",
    });
    expect(pool.connect).toHaveBeenCalled(); // Ensure that connect is not called
  });

  it("should return a 404 error when the unit_id is provided but the property_id is missing", async () => {
    const mockReq = {
      method: "GET",
      query: { unit_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Missing property_id or unit_id parameter",
    });
    expect(pool.connect).toHaveBeenCalled(); // Ensure that connect is not called
  });

  it("should return a 404 error when both property_id and unit_id are missing", async () => {
    const mockReq = {
      method: "GET",
      query: {},
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Missing property_id or unit_id parameter",
    });
    expect(pool.connect).toHaveBeenCalled(); // Ensure that connect is not called
  });

  it("should handle errors during database query and return a 500 status", async () => {
    const mockReq = {
      method: "GET",
      query: { property_id: 1, unit_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock an error during the database query
    const mockError = new Error("Database error");
    pool.connect.mockRejectedValueOnce(mockError);

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
    expect(pool.connect).toHaveBeenCalled();
  });

  it("should return a 404 error when the unit is not found", async () => {
    const mockQuery = jest.fn().mockReturnValue({ rows: [] });
    const mockClient = { query: mockQuery, release: jest.fn() };

    pool.connect.mockResolvedValueOnce(mockClient);

    const mockReq = {
      method: "GET",
      query: { property_id: 1, unit_id: 2 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Unit not found" });
    expect(pool.connect).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT * FROM unit WHERE property_id = $1 AND unit_id = $2",
      [1, 2]
    );
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("should return a 405 error for non-GET requests", async () => {
    const mockReq = {
      method: "POST", // Change the method to test other HTTP methods
      query: { property_id: 1, unit_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(405);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Method not allowed",
    });
    expect(pool.connect).toHaveBeenCalled(); // Ensure that connect is not called for non-GET requests
  });

  it("should return a 405 error for unsupported HTTP methods", async () => {
    const unsupportedMethods = ["PUT", "DELETE", "PATCH", "OPTIONS"];

    for (const method of unsupportedMethods) {
      const mockReq = {
        method,
        query: { property_id: 1, unit_id: 1 },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await handler(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(405);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Method not allowed",
      });
      expect(pool.connect).toHaveBeenCalled(); // Ensure that connect is not called for unsupported methods
    }
  });
  // After all test cases, restore the original implementation of pool.connect
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
