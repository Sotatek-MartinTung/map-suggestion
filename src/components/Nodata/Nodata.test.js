import { shallow } from "enzyme";
import Nodata from "./index";

describe("Nodata component", () => {
  const wrapper = shallow(<Nodata />);

  it("should have text 'No data'", () => {
    expect(wrapper.text()).toBe("No data");
  });
});
