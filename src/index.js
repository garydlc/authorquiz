import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";

const authors3 = [];
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

function getTurnDataOld(authors) {
  console.log(authors[1].books);
  return {
    author: authors[1],
    books: authors[1].books
  };
}

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

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: "none"
  };
}

let state = resetState();
// const state = {
//   turnData: getTurnData(authors),
//   highlight: "none"
// };

function onAnswerSelected(answerTitle) {
  const isCorrect = state.turnData.author.books.some(
    book => book === answerTitle
  );

  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}

// function AddAuthorForm({ match }) {
//   return (
//     <div>
//       <h1>Add Author</h1>
//       <p>{JSON.stringify(match)}}</p>
//       END
//     </div>
//   );
// }

function App() {
  return (
    <AuthorQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }}
    />
  );
}

const AuthorWrapper = withRouter(({ history }) => (
  //return <AddAuthorForm onAddAuthor={console.log}/>;
  <AddAuthorForm
    onAddAuthor={author => {
      authors.push(author);
      history.push("/");
    }}
  />
));

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
