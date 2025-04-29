import { BASE_URL } from "../constants/BaseUrl";
import { Dispatch, useRef, useState } from "react";
import { Notes } from "../types/Notes";

interface Props {
  notes: Notes[];
  setNotes: Dispatch<React.SetStateAction<Notes[]>>;
}

const Searchbar = ({ setNotes, notes }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const showAdd = () => {
    setShowForm(true);
  };

  const searchNote = async () => {
    try {
      const title = searchRef.current?.value;
      if (!title) {
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
        return;
      }
      let url = `${BASE_URL}/notes`;
      url += `/?title=${title}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setNotes(data);
      if (searchRef.current) {
        searchRef.current.value = "";
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const addNote = async () => {
    try {
      console.log("Button clicked");
      const content = contentRef.current?.value;
      const title = titleRef.current?.value;
      if (!title || !content) {
        alert("Please fill both title and content");
        return;
      }

      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const newNote = {
        _id: data._id,
        title: data.title,
        content: data.content,
        updatedDate: data.updatedDate,
      };
      setNotes([...notes, newNote]);
      setShowForm(false);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="search-bar">
      <button className="add-btn" onClick={showAdd}>
        Add
      </button>
      <input ref={searchRef} placeholder="Search for note by title" />
      <button onClick={searchNote} className="search-btn">
        Search
      </button>

      {showForm && (
        <div className="add-form">
          <input
            id="title-input"
            type="text"
            ref={titleRef}
            placeholder="Title"
          />

          <textarea
            className="content-input"
            ref={contentRef}
            placeholder="Content"
            required
          />

          <div className="addNote-container">
            <button className="save-btn" type="submit" onClick={addNote}>
              Save
            </button>
            <button
              className="cancel-btn"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
