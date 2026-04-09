import { useContext, useEffect, useState } from "react";
import NoteContext from "../../../context/Note/NoteContext";
const NoteListDefault = () => {
  const { notesList, FetchNoteFormData, DeleteNote,setShowModal } = useContext(NoteContext);
  const [searchQuery,setSearchQuery]=useState("") 
  const [submitSearchQuery,setSubmitSearchQuery]=useState("")
  const FetchNoteData = (data) => {
    FetchNoteFormData(data);
  };
  const DeleteNoteHandler = (data) => {
    DeleteNote(data);
  };

  const onChangeHandler=(e)=>{ setSearchQuery(e.target.value) } 
  const onSubmitHandler=(e)=>{ e.preventDefault();
     setSubmitSearchQuery(searchQuery) }

  const finalQuery = (submitSearchQuery || searchQuery).trim().toLowerCase();

  const filteredNotes = !finalQuery
  ? notesList
  : notesList.filter((note) =>
      note.title.toLowerCase().includes(finalQuery) ||
      note.description.toLowerCase().includes(finalQuery)
    );
     

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notesList))
  },[notesList])
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-center md:text-left ">
          My Notes
        </h1>
        <button className="font-bold text-2xl md:hidden" type="button" onClick={() => setShowModal(true)}>+</button>
      </div>

      <search className="my-4">
        {" "}
        <form action="#" className="flex">
          {" "}
          <input
            type="search"
            placeholder="Search note"
            id="search"
            name="search"
            value={searchQuery}
            onChange={onChangeHandler}
            className="bg-slate-200 px-2 rounded-l-lg text-black w-full outline-none"
          />{" "}
          <button
            className="font-semibold text-lg bg-slate-600 p-2 text-white rounded-r-lg"
            type="button"
            onClick={onSubmitHandler}
          >
            Search
          </button>{" "}
        </form>{" "}
      </search>
      <div className="text-center mt-5">
        {filteredNotes.length === 0 && (
          <div className="text-xl font-semibold mx-auto">No Notes</div>
        )}
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-0 gap-4 mt-5">
        {filteredNotes.map((item) => (
          <div
            key={item.id}
            className="bg-slate-300 shadow p-4 rounded-lg flex flex-col"
          >
            {" "}
            <div className="flex justify-between">
              {" "}
              <p className="grow-none">{item.id}</p>{" "}
              <div className="flex gap-2 font-semibold">
                {" "}
                <button
                  className="text-white bg-green-700 p-2 px-4 rounded"
                  onClick={() => FetchNoteData(item)}
                >
                  {" "}
                  Edit{" "}
                </button>{" "}
                <button
                  className="text-white bg-red-700 p-2 px-4 rounded"
                  onClick={() => DeleteNoteHandler(item)}
                >
                  {" "}
                  Delete{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <p className="font-bold grow-none">{item.title}</p>{" "}
            <p className="grow break-words">{item.description}</p>{" "}
            <p className="text-right grow-none">{item.createdAt}</p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default NoteListDefault;
