import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For jest-dom assertions
import Page from "@/app/finances/page";

describe("finance page", () => {
    test("renders dashboard link", () => {
        render(<Page />);
        const dashboardLink = screen.getByText("Dashboard");
        expect(dashboardLink).toBeInTheDocument();
    });



    test("renders properties link", () => {
        render(<Page />);
        const propertiesLink = screen.getByText("Properties");
        expect(propertiesLink).toBeInTheDocument();
    });
});
