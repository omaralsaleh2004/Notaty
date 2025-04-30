import React, { Dispatch, useEffect, useState } from "react";
import { Notes } from "../types/Notes";
import { BASE_URL } from "../constants/BaseUrl";
import deleteImage from "../assets/delete.png";
import editImage from "../assets/edit.png";
interface Props {
  notes: Notes[];
  setNotes: Dispatch<React.SetStateAction<Notes[]>>;
}

const NotesTable = ({ notes, setNotes }: Props) => {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const editNote = async (id: string) => {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editedTitle,
        content: editedContent,
      }),
    });

    const data = await response.json();

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? { ...note, ...data } : note))
    );

    setEditingNoteId(null);
  };

  const handleEditClick = (note: Notes) => {
    setEditingNoteId(note._id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`${BASE_URL}/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setNotes(data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
      throw err;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <table id="notes-table">
      <colgroup>
        <col className="col-1" span={1} />
        <col className="col-2" span={1} />
        <col className="col-3" span={1} />
        <col className="col-4" span={1} />
      </colgroup>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Last Updated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note, Index) => (
          <>
            <tr key={Index}>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{note.updatedDate.toString()}</td>
              <td className="del-edit-container">
                <button type="button" onClick={() => deleteNote(note._id)}>
                  <img src={deleteImage} alt="delete-btn" />
                </button>
                <button type="button" onClick={() => handleEditClick(note)}>
                  <img src={editImage} alt="edit-btn" />
                </button>
              </td>
            </tr>
            {editingNoteId === note._id && (
              <div className="add-form">
                <h2>Edit Note</h2>
                <input
                  id="title-input"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="content-input"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Content"
                  required
                />
                <div className="addNote-container">
                  <button className="btn" onClick={() => editNote(note._id)}>
                    Save
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default NotesTable;
