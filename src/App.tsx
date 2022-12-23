import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./container/Login/login";
import { Regist } from "./container/Regist";
import { Home } from "./container/Home";
import 'antd/dist/reset.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
