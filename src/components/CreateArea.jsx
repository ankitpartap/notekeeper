import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

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
    <div>
      <form className="create-note" onSubmit={submitNote}>
        {isExpanded ? (
          <>
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
            <select
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
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
