import { useState } from "react";

const MOODS = ["☕ Calm", "✨ Happy", "🌧 Sad", "🔥 Motivated", "😴 Tired"];

export default function JournalForm({ initial = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial.title || "");
  const [content, setContent] = useState(initial.content || "");
  const [mood, setMood] = useState(initial.mood || "");
  const [tags, setTags] = useState((initial.tags || []).join(", "));
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({ title: title.trim(), content, mood, tags: parsedTags });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>{initial._id ? "Edit Entry" : "New Entry"}</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <div style={styles.moodRow}>
          {MOODS.map((m) => (
            <button
              key={m}
              style={{
                ...styles.moodBtn,
                ...(mood === m ? styles.moodActive : {}),
              }}
              onClick={() => setMood(mood === m ? "" : m)}
            >
              {m}
            </button>
          ))}
        </div>

        <input
          style={styles.input}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button style={styles.saveBtn} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "1rem",
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
  },
  heading: { margin: 0, color: "#3b2a1a" },
  error: {
    background: "#ffeaea",
    color: "#c0392b",
    padding: "0.5rem 0.8rem",
    borderRadius: "6px",
    fontSize: "0.875rem",
    margin: 0,
  },
  input: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  moodRow: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  moodBtn: {
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#f9f5ef",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  moodActive: {
    background: "#c8a96e",
    color: "#fff",
    border: "1px solid #c8a96e",
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: "0.75rem" },
  cancelBtn: {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  saveBtn: {
    padding: "0.6rem 1.4rem",
    borderRadius: "8px",
    border: "none",
    background: "#c8a96e",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
  },
};
