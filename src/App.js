import logo from './logo.svg';
import Home from './components/Home';
import MintHome from './components/Mint';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route
              path="/mint"
              element={<MintHome />}
          ></Route>
          <Route
              path="/"
              element={<Home />}
          ></Route>
      </Routes>
    </div>
  );
}

export default App;
