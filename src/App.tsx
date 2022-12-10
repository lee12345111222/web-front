import { HashRouter, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';
import { Login } from "./container/Login/login";
import { Regist } from "./container/Regist";
import { Home } from "./container/Home";
import { Button } from 'antd';
function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </>

  );
}

export default App;
