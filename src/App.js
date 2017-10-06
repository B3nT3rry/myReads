import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    
    bookstate: [],
    showSearchPageState: true
  };

  componentDidMount() {
    BooksAPI.getAll().then(bookstate => {
      this.setState({ bookstate });
    });
  }

  changeShelf = (e, filteredBook) => {
    const bookstate = this.state.bookstate;
    const shelf = e.target.value;
    filteredBook.shelf = e.target.value;
    this.setState({
      bookstate
    });

    BooksAPI.update(filteredBook, shelf).then(() => {
      this.setState(state => ({
        bookstate: state.bookstate
          .filter(b => b.id !== filteredBook.id)
          .concat([filteredBook])
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookstate={this.state.bookstate}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              bookstate={this.state.bookstate}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
