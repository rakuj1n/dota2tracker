import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Meta from './Pages/Meta'

function App() {


  return (
    <>
    <h1>hello</h1>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/meta" element={<Meta />}/>
      </Routes>
      <h1>hello</h1>
    </>
  )
}

export default App
