import { Dispatch, useEffect } from "react";
import { Notes } from "../types/Notes";
import { BASE_URL } from "../constants/BaseUrl";
import deleteImage from "../assets/delete.png";
import editImage from "../assets/edit.png";
interface Props {
  notes: Notes[];
  setNotes: Dispatch<React.SetStateAction<Notes[]>>;
}

const NotesTable = ({ notes, setNotes }: Props) => {
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

  const editNote = (id) => {};

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
        <col span={1} style={{ width: "20%" }} />
        <col span={1} style={{ width: "55%" }} />
        <col span={1} style={{ width: "20%" }} />
        <col span={1} style={{ width: "5%" }} />
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
          <tr key={Index}>
            <td>{note.title}</td>
            <td>{note.content}</td>
            <td>{note.updatedDate.toString()}</td>
            <td className="del-edit-container">
              <button type="button" onClick={() => deleteNote(note._id)}>
                <img src={deleteImage} alt="delete-btn" />
              </button>
              <button type="button" onClick={() => editNote(note._id)}>
                <img src={editImage} alt="edit-btn" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotesTable;
