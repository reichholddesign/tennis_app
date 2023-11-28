import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Login from './pages/Login'
import Add from './pages/Add';
import Opponents from './pages/opponents';
import Update from './pages/Update';
import Layout from './components/Navbar';
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import Profile from "./components/Profile"


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<Add />} />
      <Route path="/update" element={<Update />} />
      </Routes>
      </BrowserRouter>
      <Profile />
      <LoginButton />
      <LogoutButton />
    </>
  )
}

export default App
