import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const DEFAULT_CATEGORY = "General";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    const normalizedNote = {
      ...newNote,
      category: newNote.category && newNote.category.trim() ? newNote.category.trim() : DEFAULT_CATEGORY,
    };

    setNotes((prevNotes) => {
      return [...prevNotes, normalizedNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  useEffect(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      if (Array.isArray(storedNotes) && storedNotes.length > 0) {
        setNotes(
          storedNotes.map((noteItem) => ({
            ...noteItem,
            category: noteItem.category || DEFAULT_CATEGORY,
          }))
        );
      }
    } catch (error) {
      console.error("Unable to load notes from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            category={noteItem.category || DEFAULT_CATEGORY}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
