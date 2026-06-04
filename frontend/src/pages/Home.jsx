import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import JournalForm from "../components/JournalForm";

export default function Home({ onLogout }) {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchJournals = useCallback(async () => {
    try {
      const { data } = await api.get("/journals");
      setJournals(data);
    } catch {
      setError("Failed to load journals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const handleCreate = async (body) => {
    try {
      const { data } = await api.post("/journals", body);
      setJournals((prev) => [data, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create entry");
    }
  };

  const handleUpdate = async (body) => {
    try {
      const { data } = await api.put(`/journals/${editing._id}`, body);
      setJournals((prev) =>
        prev.map((j) => (j._id === data._id ? data : j))
      );
      setEditing(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update entry");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      await api.delete(`/journals/${id}`);
      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch {
      setError("Failed to delete entry");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Sip &amp; Scribble ☕</h1>
        <button style={styles.logoutBtn} onClick={logout}>
          Log out
        </button>
      </header>

      <main style={styles.main}>
        {error && (
          <p style={styles.error} onClick={() => setError("")}>
            {error} &times;
          </p>
        )}

        <button style={styles.newBtn} onClick={() => setShowForm(true)}>
          + New Entry
        </button>

        {loading ? (
          <p style={styles.info}>Loading...</p>
        ) : journals.length === 0 ? (
          <p style={styles.info}>No entries yet. Write your first one!</p>
        ) : (
          <div style={styles.grid}>
            {journals.map((j) => (
              <div key={j._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{j.title}</h3>
                  {j.mood && <span style={styles.mood}>{j.mood}</span>}
                </div>

                {j.content && (
                  <p style={styles.cardContent}>
                    {j.content.length > 120
                      ? j.content.slice(0, 120) + "…"
                      : j.content}
                  </p>
                )}

                {j.tags && j.tags.length > 0 && (
                  <div style={styles.tagRow}>
                    {j.tags.map((t) => (
                      <span key={t} style={styles.tag}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div style={styles.cardFooter}>
                  <span style={styles.date}>
                    {new Date(j.createdAt).toLocaleDateString()}
                  </span>
                  <div style={styles.cardActions}>
                    <button
                      style={styles.editBtn}
                      onClick={() => setEditing(j)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(j._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <JournalForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editing && (
        <JournalForm
          initial={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fdf8f0", fontFamily: "sans-serif" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#fff",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  },
  logo: { margin: 0, color: "#3b2a1a", fontSize: "1.4rem" },
  logoutBtn: {
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#555",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  error: {
    background: "#ffeaea",
    color: "#c0392b",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  info: { color: "#888", textAlign: "center" },
  newBtn: {
    alignSelf: "flex-start",
    padding: "0.65rem 1.4rem",
    borderRadius: "8px",
    border: "none",
    background: "#c8a96e",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.25rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  cardTitle: { margin: 0, color: "#3b2a1a", fontSize: "1rem", fontWeight: 700 },
  mood: { fontSize: "0.8rem", color: "#888", whiteSpace: "nowrap" },
  cardContent: { margin: 0, fontSize: "0.875rem", color: "#555", lineHeight: 1.5 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
  tag: {
    fontSize: "0.75rem",
    background: "#f0e8d8",
    color: "#7a5c38",
    padding: "0.2rem 0.6rem",
    borderRadius: "20px",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "0.5rem",
    borderTop: "1px solid #f0e8d8",
  },
  date: { fontSize: "0.75rem", color: "#aaa" },
  cardActions: { display: "flex", gap: "0.5rem" },
  editBtn: {
    padding: "0.3rem 0.7rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  deleteBtn: {
    padding: "0.3rem 0.7rem",
    borderRadius: "6px",
    border: "none",
    background: "#ffeaea",
    color: "#c0392b",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};
