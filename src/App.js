import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddOrEditJob from "./pages/AddOrEditJob";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addOrEdit" element={<AddOrEditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
