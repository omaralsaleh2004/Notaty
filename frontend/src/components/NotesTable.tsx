import { Dispatch, useEffect } from "react";
import { Notes } from "../types/Notes";
import { BASE_URL } from "../constants/BaseUrl";

interface Props {
  notes: Notes[];
  setNotes: Dispatch<React.SetStateAction<Notes[]>>;
}

const NotesTable = ({ notes ,setNotes }: Props) => {
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
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* You can add a delete or edit button here */}
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NotesTable;
