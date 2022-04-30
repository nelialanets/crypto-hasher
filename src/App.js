import "./App.css";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Reset from "./components/Reset";
import CryptoPage from "./pages/CryptoPage";
import Header from "./components/Header";
import CoinsPage from "./pages/CoinsPage";
import Alert from './components/Alert'

function App() {

  return (
    <div className='App-main'>
      <Router>
        <div>
          <Header />
        <Routes>
          {/* <Route exact path="/reset" element={<Reset />} /> */}
          <Route exact path="/" element={<CryptoPage />} />
          <Route exact path="/coins/:id" element={<CoinsPage/>} />
        </Routes>
        </div>
        <Alert />
      </Router>
    </div>
  );
}
export default App;
