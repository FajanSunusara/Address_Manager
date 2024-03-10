import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddressManager from "./AddressManager";
import Home from "./Home";
import EditPage from "./EditPage"; // Import EditPage component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addressManager" element={<AddressManager />} />
          <Route path="/edit/:id" element={<EditPage />} /> // Route for EditPage with dynamic id parameter
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
