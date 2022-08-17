import { render } from "@testing-library/react";
import Mapbox from "@/pages/mapbox";

it("renders homepage unchanged", () => {
  const { container } = render(<Mapbox />);
  expect(container).toMatchSnapshot();
});
