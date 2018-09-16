import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as BooksDbAPI from './utils/BooksDbAPI'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelves: []
  }
  componentDidMount() {
    BooksDbAPI.getAll("books").then((books) => {
      this.setState({ books })
    })
    BooksDbAPI.getAll("shelfs").then((shelves) => {
      this.setState({ shelves })
    })

  }

  removeBook = (book) => {
    this.setState((pState) =>({
      contacts: pState.books.filter((c) => c.id !== book.id)
    }))
    BooksDbAPI.remove(book)
  }

  createBook(book){
    BooksDbAPI.create(book).then(book => {
      this.setState(state => ({
        books: state.books.concat([ book ])
      }))
    })
  }

  changeShelf(){
    //TODO
  }

  render() {
    return (
      <div className="app">
      {console.log(this.state.shelves)}
        <Route path='/' render={() => (
            <BookShelf
                shelfList = {this.state.shelves}
                bookList = {this.state.books}
                onDeleteBook = {this.removeBook}
                onChangeShelf = {this.changeShelf}
              />
        )}/>
        <Route exact path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => {history.push("/");}}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
