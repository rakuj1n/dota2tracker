import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import Teams from './Pages/Teams/Teams'

function App() {


  return (
    <>
    <h1>This is a Navbar with links to home, meta, teams</h1>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/meta" element={<Meta />}/>
        <Route path="/teams" element={<Teams />}/>
      </Routes>
    </>
  )
}

export default App
