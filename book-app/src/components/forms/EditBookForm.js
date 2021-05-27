import React, { useState } from 'react'
import Button from "@material-ui/core/Button"

const EditBookForm = props => {
	// const initialFormState = { _id: null, title: '', author: '', price: '',read:false, rating:0 }
  const [ book, setBook ] = useState(props.currentBook)

  // useEffect(
  //   () => {
  //     setBook(book)
      
  //   },
  //  [ props ]
  // )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setBook({ ...book, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateBook(book._id, book)
      }}
    >
      <label>Title</label>
      <input type="text" name="title" value={book.title} onChange={handleInputChange} />
      <label>Author</label>
      <input type="text" name="author" value={book.author} onChange={handleInputChange} />
      <label>Price</label>
      <input type="text" name="price" value={book.price} onChange={handleInputChange} />
      <Button variant="contained" color="secondary" type="submit">Update book</Button>&nbsp;
      <Button variant="contained" color="primary" onClick={() => props.setEditing(false)} >
        Cancel
      </Button>
    </form>
  )
}

export default EditBookForm
