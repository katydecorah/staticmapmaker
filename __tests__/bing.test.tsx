import { render } from "@testing-library/react";
import Bing from "@/pages/bing";

it("renders homepage unchanged", () => {
  const { container } = render(<Bing />);
  expect(container).toMatchSnapshot();
});
