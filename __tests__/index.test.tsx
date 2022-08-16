import { render } from "@testing-library/react";
import HomePage from "@/pages/index";

it("renders homepage unchanged", () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
