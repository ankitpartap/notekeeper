import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import SaveIcon from "@mui/icons-material/Save";

function Note(props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: props.title, content: props.content, category: props.category });
  const updateDraft = (event) => setDraft({ ...draft, [event.target.name]: event.target.value });
  const save = () => {
    if (!draft.content.trim()) return;
    props.onUpdate(props.id, { ...draft, category: draft.category.trim() || "General" });
    setEditing(false);
  };

  return (
    <div className={`note${props.pinned ? " pinned" : ""}`}>
      <div className="note-header">
        {editing ? <input className="note-edit-title" name="title" value={draft.title} onChange={updateDraft} aria-label="Note title" /> : <h1>{props.title || "Untitled"}</h1>}
        <div className="note-actions">
          <button className={props.pinned ? "active" : ""} onClick={() => props.onTogglePin(props.id)} aria-label={props.pinned ? "Unpin note" : "Pin note"}><PushPinIcon /></button>
          <button onClick={() => (editing ? save() : setEditing(true))} aria-label={editing ? "Save note" : "Edit note"}>{editing ? <SaveIcon /> : <EditIcon />}</button>
          <button onClick={() => props.onDelete(props.id)} aria-label="Delete note"><DeleteIcon /></button>
        </div>
      </div>
      {editing ? <><input className="note-edit-category" name="category" value={draft.category} onChange={updateDraft} aria-label="Note category" /><textarea name="content" value={draft.content} onChange={updateDraft} aria-label="Note content" /></>
        : <><span className="note-category">{props.category || "General"}</span><p>{props.content}</p><time dateTime={props.updatedAt}>Updated {new Date(props.updatedAt).toLocaleDateString()}</time></>}
    </div>
  );
}

export default Note;
