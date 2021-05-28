import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import AddBookForm from './forms/AddBookForm'
import EditBookForm from './forms/EditBookForm'
import BookTable from './tables/BookTable'
//import Popup from './Popup'
import '../App.css'

const BookManager = () => {
	// Data
	const booksData = []
	const initialFormState = { _id: null, title: '', author: '', price: '' , read:false, rating:0}

	// Setting state
	const [ books, setBooks ] = useState(booksData)
	const [ currentBook, setCurrentBook ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// Pulling data from Mongo database throw Python app.py service
	useEffect(() => {
		fetch('http://localhost:5000/books').then(response => 
		  response.json().then(data => {
		  setBooks(data.books);
		  console.log(data.books);
		}))
	  },[]);

	function getBooks() {
		fetch('http://localhost:5000/books').then(response => 
		  response.json().then(data => {
		  setBooks(data.books);
		  console.log(data.books);
		}))	;	
	}
	  
	// CRUD operations
	const addBook = book => {
		console.log("add: " + book)
        axios.post("http://localhost:5000/books", book)
            .then(response => {
				console.log(response)
				getBooks()
            })
            .catch(error => {
                console.log(error)
			})
	}

	const deleteBook = _id => {
		setEditing(false)
        axios.delete("http://localhost:5000/books/" + _id)
            .then(response => {
				console.log(response)
				getBooks()
            })
            .catch(error => {
                console.log(error)
			})
	}

	const updateBook = (_id, book) => {
		setEditing(false)

		axios.put("http://localhost:5000/books/" + _id, book)
            .then(response => {
				console.log(response)
				getBooks()
            })
            .catch(error => {
                console.log(error)
			})
	}

	const editRow = book => {
		console.log("editRow: " + book._id)
		setEditing(true)
		console.log(book)
		setCurrentBook({ _id: book._id, title: book.title, author: book.author, price: book.price })		
	}

	return (
		<div className="container">
			<h1>华夏中文学校-图书管理</h1>
			{/* <div>
				<Popup addBook={addBook}/>
			</div> */}
			<div className="flex-row">
				{ <div className="flex-shrink">
					{editing ? (
						<Fragment>
							<h2>Edit book</h2>
							<EditBookForm
								editing={editing}
								setEditing={setEditing}
								currentBook={currentBook}
								updateBook={updateBook}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add book</h2>
							<AddBookForm addBook={addBook} />
						</Fragment>
					)}
				</div> }
				<div className="flex-large">
					<h2>View books</h2>
					<BookTable books={books} editRow={editRow} deleteBook={deleteBook} />
				</div>
			</div>
		</div>
	)
}

export default BookManager
