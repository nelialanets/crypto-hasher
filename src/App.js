import "./App.css";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import CryptoPage from "./pages/CryptoPage";
import Header from "./components/Header";
import CoinsPage from "./pages/CoinsPage";
import Alert from './components/Alert'

function App() {

  return (
    <div className={App}>
      <Router>
        <div>
          <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/cryptopage" element={<CryptoPage />} />
          <Route exact path="/coins/:id" element={<CoinsPage/>} />
        </Routes>
        </div>
        <Alert />
      </Router>
    </div>
  );
}
export default App;
