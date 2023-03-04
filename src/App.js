import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Insert from "./pages/Insert"
import Edit from "./pages/Edit"
import Welcome from "./pages/Welcome"
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/edit/:ids" element={<Edit />} />
      </Routes>
    </div>
  )
}
export default App
