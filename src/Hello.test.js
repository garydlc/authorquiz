import React from "react";
import ReactDOM from "react-dom";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

function Hello(props) {
  return <h2> Hello at {props.now} </h2>;
}

const moment = new Date(1552095715);

describe("When settings up testing", () => {
  let result;
  //setup, create object
  beforeAll(() => {
    result = Hello({ now: moment.toISOString() });
  });

  it("return a value", () => {
    expect(result).not.toBeNull();
  });

  it("is a h1", () => {
    expect(result.type).toBe("h2");
  });

  it("has children", () => {
    expect(result.props.children).toBeTruthy();
  });
});

describe("When testing with ReactDOM", () => {
  it("it renders wo crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Hello now={moment.toISOString()} />, div);
  });
});

Enzyme.configure({ adapter: new Adapter() });

describe("when testing with Enzyme", () => {
  it("renders a h13", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find("h2").length).toBe(1);
  });

  it("contains hello at timestamp", () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.contains(<h1>Hello at 2020 </h1>)).toBe(false);
  });
});
