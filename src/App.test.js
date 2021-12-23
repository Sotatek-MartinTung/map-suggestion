import { shallow } from "enzyme";
import { Input } from "reactstrap";
import App from "./App";
import Map from "./components/Map";

describe("App component", () => {
  const wrapper = shallow(<App />);

  it("should have map element and component", () => {
    expect(wrapper.find(Map)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(1);
  });
});
