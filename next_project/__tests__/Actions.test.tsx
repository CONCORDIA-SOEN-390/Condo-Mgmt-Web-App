import React from "react";
import { render } from "@testing-library/react";
import CompleteSignup from "../src/app/(auth)/signup/complete/page";
import NavBar from "@/components/GeneralComponents/NavBar";
import ProfileCompletionForm from "@/components/CompleteProfileComponents/ProfileCompletionForm";
import Footer from "@/components/GeneralComponents/Footer";

describe("CompleteSignup component", () => {
  test("renders without crashing", () => {
    render(<CompleteSignup />);
  });

  test("renders child components", () => {
    const { getByTestId } = render(<CompleteSignup />);
    expect(getByTestId("navbar")).toBeInTheDocument();
    expect(getByTestId("profile-completion-form")).toBeInTheDocument();
    expect(getByTestId("footer")).toBeInTheDocument();
  });

  test("applies correct styling classes", () => {
    const { container } = render(<CompleteSignup />);
    expect(
      (container?.firstChild as HTMLElement)?.classList.contains(
        "container-hero"
      )
    ).toBeTruthy();
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.classList.contains(
        "bg-sky-50"
      )
    ).toBeTruthy();
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.classList.contains(
        "my-36"
      )
    ).toBeTruthy();
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.classList.contains(
        "py-10"
      )
    ).toBeTruthy();
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.classList.contains(
        "rounded-lg"
      )
    ).toBeTruthy();
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.classList.contains(
        "max-w-xl"
      )
    ).toBeTruthy();
  });

  test("limits container width with max-w-xl class", () => {
    const { container } = render(<CompleteSignup />);
    expect(
      (container?.firstChild?.firstChild as HTMLElement)?.getAttribute("style")
    ).toContain("max-width: 36rem");
  });

  test("renders necessary HTML elements", () => {
    const { container } = render(<CompleteSignup />);
    expect((container?.firstChild as HTMLElement)?.tagName).toBe("DIV");
    expect((container?.firstChild as HTMLElement)?.childNodes.length).toBe(3);
  });

  test("has correct structure", () => {
    const { container } = render(<CompleteSignup />);
    expect((container?.firstChild as HTMLElement)?.childNodes[0].nodeName).toBe(
      "NAV"
    );
    expect((container?.firstChild as HTMLElement)?.childNodes[1].nodeName).toBe(
      "DIV"
    );
    expect((container?.firstChild as HTMLElement)?.childNodes[2].nodeName).toBe(
      "FOOTER"
    );
  });
});
