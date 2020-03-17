import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
/**
 * Enzyme can render only one component in all application
 *
 * describe() is jest function expect 2 arguments
 *  1. arg is description of test can be anything
 *  2. is the test function it()
 * --------------------------------------
 * it() is jest function expect 2 arguments
 *  1. is the description of what to do
 *  2. is the function for testing logic
 *      2.1 we can pass functions like beforeEach() and afterEach()
 * -----------------------------------------
 * expect() is jest function that expect one argument
 *  1. thing to inspect - wrapper.find(childItem-not jsx) -> find is enzyme utility function
 *      1.1 . chain utility function : .toHaveLength(2)
 * ----------------------------------------------
 * to test run: npm test
 */

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if authenticated", () => {
    //wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render Logout <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
