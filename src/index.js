import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";

const authors = [
  {
    name: "Mark Twain",
    key: 1,
    imageUrl: "images/authors/mark_twain.jpg",
    imageSource: "Wikipedia Commons",
    books: [
      "Adventures of Huck Finn",
      "Life on Mississippi",
      "Adventures of Tom Sawer"
    ]
  },
  {
    name: "Douglas Adams",
    key: 2,
    imageUrl: "images/authors/douglas_adams.jpg",
    imageSource: "Wikipedia Commons",
    books: [
      "Hitchhikers Guide to the Galaxy",
      "Restaurant at end of the Universe",
      "Dirk Gently",
      "so long and thanks for all the fish"
    ]
  },
  {
    name: "Steven King",
    key: 3,
    imageUrl: "images/authors/king.jpg",
    imageSource: "Wikipedia Commons",
    books: ["Pet semetary", "Carrie", "firestarter", "Shining"]
  },
  {
    name: "JK Rowling",
    key: 4,
    imageUrl: "images/authors/jk_rowling.jpg",
    imageSource: "Wikipedia Commons",
    books: [
      "Harry potter 1",
      "Harry potter 2",
      "Harry potter 3",
      "Harry potter 4"
    ]
  }
];

function concatBooks(acc, cur, indx) {
  return acc.concat(cur.books);
}

function getTurnData(authors) {
  const allBooks = authors.reduce(concatBooks, []);

  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);

  return {
    author: authors.find(author =>
      author.books.some(title => title === answer)
    ),
    books: fourRandomBooks
  };
}

//applies action on state in to produce NEW state
function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: "" },
  action
) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.some(
        book => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong"
      });
    case "CONTINUE":
      return Object.assign({}, state, {
        highlight: "",
        turnData: getTurnData(state.authors)
      });
    case "ADD_AUTHOR":
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author])
      });

    default:
      return state;
  }
}

//let state = resetState();

//need reducer function
let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
