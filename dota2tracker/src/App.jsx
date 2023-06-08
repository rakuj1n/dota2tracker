import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import Teams from './Pages/Teams/Teams'
import ProMatches from './Pages/Home/ProMatches'
import db from './db'

function App() {

  const [teamData,setTeamData] = useState(db)

// https://stackoverflow.com/questions/74730633/how-can-i-fetch-data-from-multiple-pages-using-axios-and-usestate-useeffect
//   useEffect(() => {
//     let cancelled = false

//     async function fetchTeamData() {
//       const results = []

//       for (let i = 0; i < 19; i++) {
//         const response = await fetch(`https://api.opendota.com/api/teams?page=${i}`)
//         const jsonTeamData = await response.json()
//         if (!cancelled) {
//           results.push(...jsonTeamData)
//         }
//       }
//       setTeamData(results)
//     }

//     fetchTeamData()

//     return () => {
//       cancelled = true
//     }
//   },[])

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
        <Route path="/meta" element={<Meta />}></Route>
        <Route path="/teams" element={<Teams />}/>
      </Routes>
    </>
  )
}

export default App
