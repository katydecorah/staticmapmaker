import { render } from "@testing-library/react";
import Google from "@/pages/google";

it("renders homepage unchanged", () => {
  const { container } = render(<Google />);
  expect(container).toMatchSnapshot();
});
