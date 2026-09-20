import React, { useState, useEffect, useMemo, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";

const DEFAULT_CATEGORY = "General";

function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const importInput = useRef(null);

  function normalizeNote(note, index = 0) {
    const now = new Date().toISOString();
    return {
      id: note.id || `note-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
      title: typeof note.title === "string" ? note.title : "",
      content: typeof note.content === "string" ? note.content : "",
      category: typeof note.category === "string" && note.category.trim() ? note.category.trim() : DEFAULT_CATEGORY,
      pinned: Boolean(note.pinned),
      createdAt: note.createdAt || now,
      updatedAt: note.updatedAt || note.createdAt || now,
    };
  }

  function addNote(newNote) {
    const now = new Date().toISOString();
    const normalizedNote = normalizeNote({ ...newNote, createdAt: now, updatedAt: now });

    setNotes((prevNotes) => [...prevNotes, normalizedNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((noteItem) => noteItem.id !== id));
  }

  function updateNote(id, changes) {
    setNotes((prevNotes) => prevNotes.map((note) => (
      note.id === id ? { ...note, ...changes, updatedAt: new Date().toISOString() } : note
    )));
  }

  function togglePin(id) {
    setNotes((prevNotes) => prevNotes.map((note) => (
      note.id === id ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() } : note
    )));
  }

  function exportNotes() {
    const blob = new Blob([JSON.stringify({ version: 1, notes }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `keeper-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importNotes(event) {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const imported = Array.isArray(parsed) ? parsed : parsed && parsed.notes;
        if (!Array.isArray(imported) || imported.some((note) => !note || typeof note !== "object" || typeof note.content !== "string")) {
          throw new Error("The backup must contain a notes array with valid note content.");
        }
        setNotes(imported.map(normalizeNote));
        setError("");
      } catch (importError) {
        setError(`Import failed: ${importError.message || "Please choose a valid JSON backup."}`);
      }
    };
    reader.onerror = () => setError("Import failed: the backup file could not be read.");
    reader.readAsText(file);
  }

  useEffect(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      if (Array.isArray(storedNotes)) setNotes(storedNotes.map(normalizeNote));
    } catch (error) {
      setError("Saved notes could not be loaded.");
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loaded]);

  const categories = useMemo(() => ["All", ...new Set(notes.map((note) => note.category))], [notes]);
  const visibleNotes = useMemo(() => notes
    .filter((note) => category === "All" || note.category === category)
    .filter((note) => `${note.title} ${note.content} ${note.category}`.toLowerCase().includes(query.toLowerCase().trim()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || new Date(b.updatedAt) - new Date(a.updatedAt)), [notes, category, query]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <main>
        <div className="toolbar">
          <label className="search-box"><SearchIcon /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes..." aria-label="Search notes" /></label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
            {categories.map((item) => <option key={item} value={item}>{item === "All" ? "All categories" : item}</option>)}
          </select>
          <button className="text-button" onClick={exportNotes}><DownloadIcon /> Export</button>
          <button className="text-button" onClick={() => importInput.current.click()}><UploadIcon /> Import</button>
          <input ref={importInput} type="file" accept="application/json,.json" onChange={importNotes} hidden />
        </div>
        {error && <div className="message error" role="alert">{error}</div>}
        {notes.length === 0 ? <div className="message">No notes yet. Add your first note above.</div>
          : visibleNotes.length === 0 ? <div className="message">No notes match your search.</div>
          : <div className="notes-grid">{visibleNotes.map((noteItem) => <Note key={noteItem.id} {...noteItem} onDelete={deleteNote} onUpdate={updateNote} onTogglePin={togglePin} />)}</div>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
