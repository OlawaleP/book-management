import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Index from "./components/mainpage/Index";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/" element={<Index/>} />
      </Routes>
    </Router>
  )
}

export default App
