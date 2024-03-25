import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("should have hello test", () => {
  render(<Home />); //ARRANGE

  const myElem = screen.getByText("hello"); //ACT

  expect(myElem).toBeInTheDocument(); //ASSERT
});
