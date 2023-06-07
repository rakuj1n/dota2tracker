import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import Teams from './Pages/Teams/Teams'
import ProMatches from './Pages/Home/ProMatches'

function App() {

  const [teamData,setTeamData] = useState([])

  async function fetchTeamData() {
    const response = await fetch(`https://api.opendota.com/api/teams`)
    const jsonTeamData = await response.json()
    setTeamData(jsonTeamData)
  }

  useEffect(() => {
    fetchTeamData()
  },[])

  console.log(teamData)

  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/meta">Meta</Link>
      <Link to="/teams">Teams</Link>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/leagues/:id' element={<ProMatches teamData={teamData}/>}/>
        </Route>
        <Route path="/meta" element={<Meta />}/>
        <Route path="/teams" element={<Teams />}/>
      </Routes>
    </>
  )
}

export default App
