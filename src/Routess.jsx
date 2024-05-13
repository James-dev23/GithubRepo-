import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Layout/Home';
import Singlerepo from './Layout/Singlerepo';
import Notfound from './Components/Notfound';

function Routess() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/details' element={<Singlerepo />} />
        <Route path="*" element={<Notfound />}></Route>
    </Routes>
    </>
  )
}

export default Routess