import { render } from "@testing-library/react";
import CartoDB from "@/pages/cartodb";

it("renders homepage unchanged", () => {
  const { container } = render(<CartoDB />);
  expect(container).toMatchSnapshot();
});
