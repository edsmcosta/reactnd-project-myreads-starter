import React, {Component} from 'react' 
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class BookShelf extends Component{
    static propTypes = {
        bookList: PropTypes.array.isRequired 
    }

    state = {
        query: ''
    }
    render(){
        return (
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
        )
    }

}