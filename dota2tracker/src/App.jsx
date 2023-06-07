import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import Teams from './Pages/Teams/Teams'

function App() {


  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/meta">Meta</Link>
      <Link to="/teams">Teams</Link>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/meta" element={<Meta />}/>
        <Route path="/teams" element={<Teams />}/>
      </Routes>
    </>
  )
}

export default App
