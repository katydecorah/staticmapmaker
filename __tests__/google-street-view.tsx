import { render } from "@testing-library/react";
import GoogleStreetView from "@/pages/google-street-view";

it("renders homepage unchanged", () => {
  const { container } = render(<GoogleStreetView />);
  expect(container).toMatchSnapshot();
});
