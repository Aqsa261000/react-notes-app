import DefaultLayout from "./components/layout/DefaultLayout";
import NoteList from "./components/features/NoteList";
import NoteState from "./context/Note/NoteState";
import "./App.css";

function App() {
  return (
    <NoteState>
      <DefaultLayout>
        <NoteList />
      </DefaultLayout>
    </NoteState>
  );
}

export default App;
