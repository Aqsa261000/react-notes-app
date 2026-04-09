import { useContext, useEffect, useState } from "react";
import NoteContext from "../../../context/Note/NoteContext";
import { CloseIcon } from "../../../assets";

const Sidebar = () => {
  const { AddNote, noteFormData, showModal, setShowModal, EditNote } =
    useContext(NoteContext);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    createdAt: "",
  });
  const [isSubmitted,setIsSubmitted] = useState(false)

  const onChangeHandler = (e) => {
    setNoteData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = () => {
    setIsSubmitted(true)
    if(!noteData.title.trim() || !noteData.description.trim() || !noteData.createdAt){
      return;    
    }
    if (noteFormData) {
      EditNote({ id: noteFormData.id, ...noteData });
      
    } else {
      AddNote({ id: Math.floor(Math.random() * 100), ...noteData });
    }

    setNoteData({
      title: "",
      description: "",
      createdAt: "",
    });
    // agar add ho jaaye toh
  };

  useEffect(() => {
    setNoteData({
      title: noteFormData?.title ?? "",
      description: noteFormData?.description ?? "",
      createdAt: noteFormData?.createdAt ?? "",
    });
  }, [noteFormData]);

  useEffect(()=>{if(showModal){setIsSubmitted(false)}},[showModal])

  return (
    <>
      <div className="flex-col gap-4 md:flex hidden w-64 p-4">
        <div className="font-bold flex gap-2 items-center">
          <img src="favicon.ico" alt="nav-logo" className="w-7" />
          <p className="text-xl">QuickStart</p>
        </div>
        <button
          className="my-2 bg-yellow-500 py-2 rounded-lg font-bold"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Note +
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-96 flex flex-col items-center justify-center md:mx-0 mx-7">
            <div className="flex justify-between w-full">
              <h1 className="font-bold text-2xl py-4 mx-auto">Note Form</h1>
              <button
                className="text-red-600 font-bold w-5"
                type="button"
                onClick={() => setShowModal(false)}
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
            </div>
            <form action="#">
              <div className="text-center w-full">
                <label htmlFor="title">Note Title</label>
                <br />
                <input
                  className="text-black my-2 px-2"
                  type="text"
                  id="title"
                  name="title"
                  value={noteData.title}
                  placeholder="Enter Note Title"
                  onChange={onChangeHandler}
                  required={true}
                />
              </div>
              {isSubmitted && !noteData.title&&<p className="text-red-500">Please enter title</p>}

              <div className="text-center">
                <label htmlFor="description">Note Description</label>
                <br />
                <input
                  className="text-black my-2 px-2"
                  type="text"
                  id="description"
                  name="description"
                  value={noteData.description}
                  placeholder="Enter Note Description"
                  onChange={onChangeHandler}
                  required={true}
                />
              </div>
              {isSubmitted && !noteData.description&&<p className="text-red-500">Please enter description</p>}

              <div className="text-center">
                <label htmlFor="createdAt">Created At</label>
                <br />
                <input
                  className="text-black my-2 px-2"
                  type="date"
                  id="createdAt"
                  name="createdAt"
                  value={noteData.createdAt}
                  onChange={onChangeHandler}
                />
              </div>
              {isSubmitted && !noteData.createdAt&&<p className="text-red-500">Please enter date</p>}
          
          <div className="flex items-center justify-center">
              <button
                className="my-4 p-2 text-white rounded font-semibold bg-yellow-600 "
                type="button"
                onClick={onSubmitHandler}
              >
                {noteFormData ? "Edit Note" : "Add Note"}
              </button>
              </div>
            </form>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
