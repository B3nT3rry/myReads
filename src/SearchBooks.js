import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  state = {
    querystate: "",
    queriedBooksState: []
  };

  queryBooks = querystate => {
    let queriedBooksState = [];

    if (querystate) {
      let queryResults = [];

      BooksAPI.search(querystate).then(results => {
        if (results && results.length) { queryResults = results.map(result => { result.shelf = this.addShelf(result); 
          return result;
          });
          this.setState({
            queriedBooksState: queryResults
          });
        } else {
          this.setState({
            queriedBooksState: []
          });
        }
      });
    } else {
      this.setState({
        queriedBooksState: []
      });
    }
    this.setState({
      querystate: querystate.trim()
    });
  };

  addShelf(result) {
    let hasShelf = this.props.bookstate.filter(book => book.id === result.id);
    return hasShelf.length ? hasShelf[0].shelf : "none";
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            &gt;
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {}
            <input
              onChange={event => this.queryBooks(event.target.value)}
              placeholder="Search by title or author"
              type="text"
            />

          </div>
        </div>
        <div className="search-books-results">
          {this.state.queriedBooksState.length > 0 && <Book
              filteredBooks={this.state.queriedBooksState}
              changeShelf={this.props.changeShelf}
            />}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
