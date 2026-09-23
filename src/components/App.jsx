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
    <div className="app-shell min-vh-100 d-flex flex-column">
      <Header />
      <main className="container flex-grow-1 py-4 py-lg-5">
        <section className="hero-section mb-4 mb-lg-5">
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <p className="eyebrow mb-2">Your personal workspace</p>
              <h2 className="display-5 fw-bold mb-3">Capture what matters.</h2>
              <p className="lead text-secondary mb-0">
                Keep ideas, reminders, and inspiration close at hand.
              </p>
            </div>
            <div className="col-lg-5">
              <CreateArea onAdd={addNote} />
            </div>
          </div>
        </section>

        <section aria-labelledby="notes-heading">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p className="eyebrow mb-1">Your collection</p>
              <h3 id="notes-heading" className="h4 mb-0">
                {notes.length === 0 ? "No notes yet" : `${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
              </h3>
            </div>
            {notes.length > 0 && <span className="notes-count">{notes.length}</span>}
          </div>

          {notes.length > 0 ? (
            <div className="row g-4">
              {notes.map((noteItem, index) => (
                <div className="col-sm-6 col-xl-4" key={index}>
                  <Note
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    category={noteItem.category || DEFAULT_CATEGORY}
                    onDelete={deleteNote}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center p-4 p-md-5">
              <div className="empty-state-icon mb-3">
                <i className="bi bi-journal-bookmark" aria-hidden="true" />
              </div>
              <h4 className="h5">Start your first note</h4>
              <p className="text-secondary mb-0">Use the form above to turn a thought into something worth keeping.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
