import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import Teams from './Pages/Teams/Teams'
import ProMatches from './Pages/Home/ProMatches'
import db from './db'
import Winrate from './Pages/Meta/Winrate'

function App() {

const [teamData,setTeamData] = useState(db)
const [metaData,setMetaData] = useState([])

async function fetchMeta() {
  const response = await fetch(`https://api.opendota.com/api/scenarios/laneRoles`)
  const jsonMetaData = await response.json()

  let reducedMetaData = jsonMetaData.reduce((acc, curr) => {
      if ((acc.some((x) => (x["hero_id"] === curr["hero_id"] &&
       x["lane_role"] === curr["lane_role"])))) {
          let idx = acc.findIndex((x)=> (x["hero_id"] === curr["hero_id"] &&
          x["lane_role"] === curr["lane_role"]))
          let newData = {
              "hero_id":acc[idx]["hero_id"],
              "lane_role":acc[idx]["lane_role"],
              "games": parseInt(acc[idx]["games"]) + parseInt(curr["games"]),
              "wins": parseInt(acc[idx]["wins"]) + parseInt(curr["wins"])
          }
          acc.splice(idx,1)
          return [...acc,newData]
      } else {
          acc.push(curr)
          return acc
      }
  },[{
      "hero_id":null,
      "lane_role":null,
      "games":"",
      "wins":""
  }])

  setMetaData(reducedMetaData)
}

const [heroData,setHeroData] = useState([])

async function fetchHero() {
  const response = await fetch(`https://api.opendota.com/api/heroes`)
  const jsonMetaData = await response.json()
  setHeroData(jsonMetaData)
}

useEffect(() => {
  fetchMeta()
  fetchHero()
},[])

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
        <Route path="/meta" element={<Meta />}>
          <Route path='/meta/:role' element={<Winrate heroData={heroData} metaData={metaData}/>}/>
        </Route>
        <Route path="/teams" element={<Teams />}/>
      </Routes>
    </>
  )
}

export default App

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