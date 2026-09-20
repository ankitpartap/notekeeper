import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <div className="note-header">
        <h1>{props.title || "Untitled"}</h1>
        <button onClick={handleClick} aria-label="Delete note">
          <DeleteIcon />
        </button>
      </div>
      <span className="note-category">{props.category || "General"}</span>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
