import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <article className="note h-100 d-flex flex-column">
      <div className="note-header d-flex justify-content-between align-items-start gap-3">
        <div>
          <span className="note-category">{props.category || "General"}</span>
          <h4 className="h5 mb-0">{props.title || "Untitled"}</h4>
        </div>
        <button className="btn btn-sm btn-icon" onClick={handleClick} aria-label="Delete note">
          <i className="bi bi-trash3" aria-hidden="true" />
        </button>
      </div>
      <p className="note-content flex-grow-1">{props.content}</p>
      <div className="note-footer">
        <i className="bi bi-bookmark-heart me-1" aria-hidden="true" /> Saved locally
      </div>
    </article>
  );
}

export default Note;
