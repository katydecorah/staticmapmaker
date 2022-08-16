import { render } from "@testing-library/react";
import MapQuest from "@/pages/mapquest";

it("renders homepage unchanged", () => {
  const { container } = render(<MapQuest />);
  expect(container).toMatchSnapshot();
});
