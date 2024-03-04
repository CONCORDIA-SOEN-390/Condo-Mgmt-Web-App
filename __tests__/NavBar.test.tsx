import { render, screen } from "@testing-library/react";
import Navbar from "@/app/components/Navigation/NavBar";

describe("Navbar component", () => {
    test("renders correctly", () => {
        render(<Navbar />);

        // check if the logo is rendered
        expect(screen.getByText("Condo360")).toBeInTheDocument();

        // check if the navigation links are correctly rendered
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Properties")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
        expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    test("navigation links with correct href attributes", () => {
        render(<Navbar />);

        // check href links
        expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
        expect(screen.getByText("Properties").closest("a")).toHaveAttribute("href", "/properties");
        expect(screen.getByText("Sign In").closest("a")).toHaveAttribute("href", "/login");
    });
});
