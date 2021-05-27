import React from "react";
import Popup from "reactjs-popup";
import AddBookForm from "./forms/AddBookForm";
import Button from "@material-ui/core/Button" 
export default (props) => (
  <Popup trigger={<Button variant="outlined" color="primary">Add New Book</Button>}>
      {close => (
      <div>
        <AddBookForm addBook={props.addBook}/>
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>
);