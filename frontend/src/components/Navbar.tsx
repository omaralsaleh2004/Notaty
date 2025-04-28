import noteImg from "../assets/note.png";
const Navbar = () => {
  return(
    <div className="navbar">
     <img width={"70px"} src={noteImg} alt="Note Picture"/>
     <div>
        <p className = "notaty">Notaty</p>
     </div>
    </div>
  )
}

export default Navbar;