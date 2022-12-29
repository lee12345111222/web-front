import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./container/Login/login";
import { Regist } from "./container/Regist";
import { Home } from "./container/Home";
import 'antd/dist/reset.css';
import { useDispatch } from 'react-redux'
import { setUsers } from './container/counter/userReducer'

function App() {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const dispatch = useDispatch()
    dispatch(setUsers(JSON.parse(userInfo)))
  }
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
