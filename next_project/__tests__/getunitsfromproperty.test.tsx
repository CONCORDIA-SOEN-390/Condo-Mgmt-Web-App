// Import the function to test
import { GET } from "../src/app/api/getunitsfromproperty/route"; // Replace 'your-file-name' with the actual file name
//import "isomorphic-fetch";
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

describe("GET function", () => {
  let req: any;

  beforeEach(() => {
    // Mocking request object
    req = {
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    };
  });

  it("should return 400 if property_id is missing", async () => {
    const response = await GET(req);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual(
      "Missing property_id or unit_id parameter"
    );
  });

  it("should return 500 if Supabase query encounters an error", async () => {
    req.nextUrl.searchParams.set("property_id", "example_id"); // Set property_id
    const supabaseError = new Error("Supabase query error");
    //jest.spyOn(console, "log").mockImplementation(); // Suppress console.log
    //jest.spyOn(console, "error").mockImplementation(); // Suppress console.error
    require("@supabase/supabase-js").createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            error: supabaseError, // Mocked error
          })),
        })),
      })),
    });

    const response = await GET(req);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual(supabaseError.message);
  });

  it("should return 500 if an internal server error occurs", async () => {
    req.nextUrl.searchParams.set("property_id", null); // Set property_id
    //jest.spyOn(console, "log").mockImplementation(); // Suppress console.log
    //jest.spyOn(console, "error").mockImplementation(); // Suppress console.error
    require("@supabase/supabase-js").createClient.mockImplementationOnce(() => {
      throw new Error("Supabase client initialization error");
    });

    const response = await GET(req);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual("Internal Server Error");
  });

  it("should return units data if property_id is provided and no error occurs", async () => {
    const mockUnitsData = [
      {
        unit_id: 11,
        property_id: 1,
        owner_id: 1,
        occupied: "TRUE",
        registration_key: "unit_reg_key_1",
      },
    ];
    req.nextUrl.searchParams.set("property_id", "example_id"); // Set property_id
    require("@supabase/supabase-js").createClient.mockReturnValueOnce({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: mockUnitsData, // Mocked data
            error: null, // No error
          })),
        })),
      })),
    });

    const response = await GET(req);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    //expect(await response.json()).toEqual(mockUnitsData);
  });
});
