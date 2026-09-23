import React, { useState } from "react";

const DEFAULT_CATEGORY = "General";
const categoryOptions = ["General", "Work", "Personal", "Ideas", "Tasks", "Travel"];

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: DEFAULT_CATEGORY,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    if (!note.content.trim()) {
      return;
    }

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      category: DEFAULT_CATEGORY,
    });
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="create-note-card">
      <form onSubmit={submitNote}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="form-icon"><i className="bi bi-pencil-square" aria-hidden="true" /></span>
          <div>
            <h3 className="h6 mb-0">Create a note</h3>
            <small className="text-secondary">What’s on your mind?</small>
          </div>
        </div>
        {isExpanded ? (
          <>
            <input
              className="form-control form-control-lg mb-3"
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Give it a title (optional)"
            />
            <select
              className="form-select mb-3"
              name="category"
              value={note.category}
              onChange={handleChange}
              aria-label="Select note category"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </>
        ) : null}
        <textarea
          className="form-control"
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Write something worth remembering..."
          rows={isExpanded ? 4 : 2}
        />
        {isExpanded && (
          <button className="btn btn-primary w-100 mt-3" type="submit">
            <i className="bi bi-plus-lg me-2" aria-hidden="true" />Save note
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
