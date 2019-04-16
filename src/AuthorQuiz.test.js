import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";

import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ["The adventures of Tom Saywer", "Adventures of Huck Finn", "whatever1", "whatever2"],
    author: {
      name: "Mark Twain",
      key: 1,
      imageUrl: "images/authors/mark_twain.jpg",
      imageSource: "Wikipedia Commons",
      books: [
        "Tom Sawyer",
        "Adventures of Huck Finn",
        "Somethong Mississippi",
        "MT Other Book"
      ]
    }
  },
  highlight: "none"
};

describe("Author quiz", () => {
  it("renders withour crashing", () => {
    const theDiv = document.createElement("div");
    ReactDOM.render(
      <AuthorQuiz {...state} onAnswerSelected={() => {}} />,
      theDiv
    );
  });

  describe("when no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
      //console.log(wrapper.find("div.row.turn").props().style.backgroundColor);
    });

    it("it should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        ""
      );
    });
  });

  describe("when wrong answer was selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("it should have red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "red"
      );
    });
  });

  describe("when correct answer was selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "correct" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("it should have red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "green"
      );
    }); 
  });

  describe("when the first is answer is selected", ()=>{
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...state}
          onAnswerSelected={handleAnswerSelected}
        />
      );
      wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should receive the shining", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalledWith("The adventures of Tom Saywer");
    })



  });


});

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<AuthorQuiz />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// Turn.propTypes = {

//   author: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     imageUrl: PropTypes.string.isRequired,
//     imageSource: PropTypes.string.isRequired,
//     books: PropTypes.arrayOf(PropTypes.string).isRequired
//   }),

//   books: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onAnswerSelected: PropTypes.func.isRequired,
//   highlight: PropTypes.string.isRequired
// };
