import { shallow } from "enzyme";
import { Card } from "reactstrap";
import { venues } from "./constant";
import Venues from "./index";

describe("Venues component", () => {
  const wrapper = shallow(<Venues venues={venues} />);

  it("should render all items", () => {
    expect(wrapper.find(Card)).toHaveLength(2);
  });
});
