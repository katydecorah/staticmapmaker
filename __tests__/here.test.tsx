import { render } from "@testing-library/react";
import Here from "@/pages/here";

it("renders homepage unchanged", () => {
  const { container } = render(<Here />);
  expect(container).toMatchSnapshot();
});
