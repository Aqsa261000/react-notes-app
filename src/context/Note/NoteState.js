import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notesList, setNotesList] = useState(()=>{
    const data = localStorage.getItem("notes")
    try{
return data ? JSON.parse(data) : []
    }catch{
return [];
    }
  });
  const [noteFormData, setNoteFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const AddNote = (data) => {
    setNotesList([...notesList, data]);
    setShowModal(false);
  };

  const FetchNoteFormData = (data) => {
    setNoteFormData(data);
    setShowModal(true);
  };

  const EditNote = (data) => {
    console.log(data);
    const updatedArray = notesList.map((note) => {
      if (note.id === data.id) {
        return {
          ...note,
          title: data.title,
          description: data.description,
          createdAt: data.createdAt,
        };
      }
      return note;
    });
    setNotesList(updatedArray);
    setNoteFormData(null);
    setShowModal(false);
  };

  const DeleteNote = (data) => {
    const filterArray = notesList.filter((item) => item.id !== data.id);
    setNotesList(filterArray);
    setNoteFormData(null);
  };

  return (
    <NoteContext.Provider
      value={{
        notesList,
        AddNote,
        FetchNoteFormData,
        noteFormData,
        setNoteFormData,
        showModal,
        setShowModal,
        EditNote,
        DeleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
