import React, { useState } from 'react'
// import styles from "./wang.css"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const AddBookForm = props => {
	const initialFormState = { _id: null, title: '', author: '', price: '',read:false, rating:0 }
	const [ book, setBook ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setBook({ ...book, [name]: value })
	}

	return (
		<form 
			onSubmit={event => {
				event.preventDefault()
				if (!book.title || !book.author) return

				props.addBook(book)
				setBook(initialFormState)
			}}
		>	
			<div>
				<TextField label="Title" name="title" onChange={handleInputChange}/><br/>
				<TextField name="author" label="Author" onChange={handleInputChange} /><br/>
				<TextField name="price" label="Price" onChange={handleInputChange} /><br/><br/>
			</div>
			<Button variant="contained" color="primary" type="submit">Add new book</Button>
		</form>
	)
}

export default AddBookForm
