import React, {Component} from 'react' 
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class BookShelf extends Component{
    static propTypes = {
        shelfList: PropTypes.array.isRequired ,
        bookList: PropTypes.array.isRequired ,
        onDeleteBook: PropTypes.func.isRequired,
        onChangeSelf: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) =>{
        this.setState({query: query.trim()})
    }

    createShelf = (shelf, books) => {
        console.log("Create shelf", shelf, books)
        return (
            <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books ? books.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.avatarURL})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.name}</div>
                                    <div className="book-authors">{book.autor}</div>
                                </div>
                            </li>
                        )): ""}
                    </ol>
                </div>
            </div>
        )
    }

    createShelves = (shelves, books) =>{
        console.log("Create shelves", shelves, books)
        return shelves.map(shelf => this.createShelf(shelf, books.filter(book => book.shelf === shelf)))
    }

    render(){
        let showingBooks
        let searchBooks
        let searchDisp = false;
        if (this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingBooks = this.props.bookList
            searchBooks = showingBooks.filter((book) => match.test(book.name))
            searchDisp = true 
            console.log(`filter:`,searchBooks)
        } else{
            showingBooks = this.props.bookList
            console.log(`complete:`,showingBooks)
        }

        showingBooks.sort(sortBy('name'))

        return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
                <input
                    className='search-contacts'
                    type='text'
                    placeholder='Search contacts'
                    value={this.state.query}
                    onChange={(event)=>{this.updateQuery(event.target.value)}}
                />
            </div>
           {searchDisp ? 
                <div className="search-result">
                    <ol className="books-grid">
                        {searchBooks.length >= 1 ? searchBooks.map(book => (
                            <li key={book.id}>
                                <div className="book">

                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.avatarURL})` }}>
                                    </div>
                                    <div className="book-shelf-changer">
                                        <select>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className="book-title">{book.name}</div>
                                    <div className="book-authors">{book.autor}</div>
                                </div>
                            </li>)) 
                            : <li><p>No books found  </p></li> 
                        }
                    </ol>
                </div>
             : ""
            }

            <div className="list-books-content">
                    {this.createShelves(this.props.shelfList, showingBooks)}
            </div>
          <Link
            to='/search'
            className="open-search"
          ><p>Add a book</p>
          </Link>
        </div>
              

        )
    }

}

export default BookShelf

                    /* 
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            {showingBooks ? showingBooks.filter(book => book.shelf === 'Currently Reading').map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.avatarURL})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="book-title">{book.name}</div>
                                        <div className="book-authors">{book.autor}</div>
                                    </div>
                                </li>
                            )): ""}
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {showingBooks ? showingBooks.filter(book => book.shelf === 'Want to Read').map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" 
                                            style={{ width: 128, height: 193, backgroundImage: `url(${book.avatarURL})` }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="book-title">{book.name}</div>
                                        <div className="book-authors">{book.autor}</div>
                                    </div>
                                </li>
                            )) : ""}
                        </ol>
                        </div>
                    </div>
                    <div className="bookshelf"> 
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                        {showingBooks ? showingBooks.filter(book => book.shelf === 'Read').map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.avatarURL})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="book-title">{book.name}</div>
                                        <div className="book-authors">{book.autor}</div>
                                    </div>
                                </li>
                            )) : ""}
                        </ol>
                        </div>
                    </div>*/