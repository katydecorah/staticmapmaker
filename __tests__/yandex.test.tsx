import { render } from "@testing-library/react";
import Yandex from "@/pages/yandex";

it("renders homepage unchanged", () => {
  const { container } = render(<Yandex />);
  expect(container).toMatchSnapshot();
});
