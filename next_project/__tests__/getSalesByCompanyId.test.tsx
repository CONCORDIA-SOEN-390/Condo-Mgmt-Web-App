// Import the function to test
import { POST } from "../src/app/api/getSalesByCompanyId/route"; // Replace 'your-file-name' with the actual file name

// Mocking Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: [], // Mocked data
          error: null, // No error
        })),
      })),
    })),
  })),
}));

describe("POST function", () => {
  let req: any;

  beforeEach(() => {
    // Mocking request object
    req = {
      json: jest.fn(() => ({})), // Mocked json() method
    };
  });

  it("should return 500 if error occurs during sales retrieval", async () => {
    req.json.mockResolvedValueOnce({ userId: "example_user_id" });
    require("@supabase/supabase-js").createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: null, // Mocked data
            error: new Error("Sales retrieval error"), // Error occurred
          })),
        })),
      })),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);
    expect(await response.text()).toEqual("Internal Server Error");
  });

  it("should return 200 if sales retrieval is successful", async () => {
    const mockSalesData = [
      {
        //sale_id_id: 1,
        //property_id: 1,
        old_owner_id: 1,
        //condo_fee: 2.0,
        //sale_date: "2017-07-23",
      },
    ];
    req.json.mockResolvedValueOnce({ userId: 1 });
    require("@supabase/supabase-js").createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockSalesData, // Mocked data
            error: null, // No error
          })),
        })),
      })),
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(await response.json()).toEqual(mockSalesData);
  });

  it("should return 500 if sales retrieval is successful", async () => {
    const mockSalesData = [
      {
        //sale_id_id: 1,
        //property_id: 1,
        old_owner_id: 1,
        //condo_fee: 2.0,
        //sale_date: "2017-07-23",
      },
    ];
    req.json.mockResolvedValueOnce({ userId: 1 });

    require("@supabase/supabase-js").createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: null, // Mocked data
            error: new Error("Locker update error"), // No error
          })),
        })),
      })),
    });

    const response = await POST(req);
    expect(response.status).toBe(500);
    //expect(response.headers.get("Content-Type")).toBe("application/json");
    //expect(await response.json()).toEqual(mockSalesData);
  });
});
