import { useState } from "react";
import Navbar from "./components/Navbar";
import NotesTable from "./components/NotesTable";
import Searchbar from "./components/Searchbar";
import { Notes } from "./types/Notes";


function App() {
  const [notes, setNotes] = useState<Notes[]>([]);
  return (
    <>
      <Navbar />
      <Searchbar notes={notes} setNotes={setNotes} />
      <NotesTable notes={notes} setNotes={setNotes} />
    </>
  );
}

export default App;
