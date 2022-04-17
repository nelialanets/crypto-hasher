import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import CryptoPage from "./pages/CryptoPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/cryptopage" element={<CryptoPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
