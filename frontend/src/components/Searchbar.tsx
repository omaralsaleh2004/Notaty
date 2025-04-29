import { BASE_URL } from "../constants/BaseUrl";
import { Dispatch, useRef, useState } from "react";
import { Notes } from "../types/Notes";

interface Props {
  notes: Notes[];
  setNotes: Dispatch<React.SetStateAction<Notes[]>>;
}

const Searchbar = ({ setNotes }: Props) => {
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
        title: data.title,
        content: data.content,
        updatedDate: data.updatedDate,
      };
      setNotes((prevNotes) => {
        console.log("Previous Notes:", prevNotes);
        const updatedNotes = [...prevNotes, newNote]; // Add the new note
        console.log("Updated Notes:", updatedNotes); // Check if new note is added
        return updatedNotes; // Return updated state
      });
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
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "35%",
            width: "50%",
          }}
          className="add-form"
        >
          <input
            type="text"
            ref={titleRef}
            placeholder="Title"
            style={{ width: "98%" }}
          />

          <textarea
            ref={contentRef}
            placeholder="Content"
            required
            style={{
              width: "97.5%",
              height: "70%",
              padding: "10px",
              fontSize: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              resize: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              type="submit"
              onClick={addNote}
              style={{ fontSize: "20px" }}
            >
              Save
            </button>
            <button
              type="button"
              style={{ fontSize: "20px" }}
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
