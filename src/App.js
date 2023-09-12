import React from 'react';
import { Routes, Route } from "react-router-dom"
import MainPage from './components/MainPage';
import About from './components/about';
import Profile from './components/profile';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}