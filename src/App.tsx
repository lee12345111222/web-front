import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./container/Login/login";
import { Regist } from "./container/Regist";
import { Home } from "./container/Home";
import { Regist as MobileRegist } from "./mobile/Regist";
import { MobileLogin } from "./mobile/Login";
import { MobileHome } from "./mobile/Home";

import { AddUser } from "./mobile/AddUser";
import { ApplyList } from "./mobile/ApplyList";
import { ChatPage } from "./mobile/ChatPage";

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
          <Route path="/mobile/regist" element={<MobileRegist />} />
          <Route path="/mobile/login" element={<MobileLogin />} />
          <Route path="/mobile/home" element={<MobileHome />} />
          <Route path="/mobile/adduser" element={<AddUser />} />
          <Route path="/mobile/applylist" element={<ApplyList />} />
          <Route path="/mobile/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
