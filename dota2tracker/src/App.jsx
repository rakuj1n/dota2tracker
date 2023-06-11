import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Meta from './Pages/Meta/Meta'
import PersonalTracker from './Pages/Personal Tracker/PersonalTracker'
import ProMatches from './Pages/Home/ProMatches'
import db from './db'
import Winrate from './Pages/Meta/Winrate'
import Matchups from './Pages/Meta/Matchups'
import NotFound from './Pages/Meta/NotFound'
import Create from './Pages/Personal Tracker/Create'
import Graph from './Pages/Personal Tracker/Graph'
import Edit from './Pages/Personal Tracker/Edit'

function App() {

const [teamData,setTeamData] = useState(db)
const [metaData,setMetaData] = useState([])
const [heroData,setHeroData] = useState([])
const [leaguesData, setLeaguesData] = useState([])
const [heroImgData, setHeroImgData] = useState({})

async function fetchLeagues() {
    const response = await fetch(`https://api.opendota.com/api/leagues`)
    const jsonLeagueData = await response.json()
    setLeaguesData(jsonLeagueData)
}

async function fetchMeta() {
  const response = await fetch(`https://api.opendota.com/api/scenarios/laneRoles`)
  const jsonMetaData = await response.json()
  // take metaData state and reduce it so that all objects with same 
  // hero_id and lane_role combine their wins # and games # into one object
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

async function fetchHero() {
  const response = await fetch(`https://api.opendota.com/api/heroes`)
  const jsonMetaData = await response.json()
  setHeroData(jsonMetaData)
}

async function fetchHeroImg() {
  const response = await fetch(`https://api.opendota.com/api/constants/heroes`)
  const jsonHeroImgData = await response.json()
  setHeroImgData(jsonHeroImgData)
}

useEffect(() => {
  fetchMeta()
  fetchHero()
  fetchLeagues()
  fetchHeroImg()
},[])

  return (
    <>
    <nav className='navbar'>
      <Link className='link' to="/">Home</Link>
      <Link className='link' to="/meta">Meta</Link>
      <Link className='link' to="/personaltracker/graph">Personal Tracker</Link>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/leagues/:id' element={<ProMatches leaguesData={leaguesData} teamData={teamData}/>}/>
        </Route>
        <Route path="/meta" element={<Meta />}>
          <Route path='/meta/:role' element={<Winrate heroData={heroData} metaData={metaData} heroImgData={heroImgData}/>}/>
          <Route path='/meta/matchups/:id' element={<Matchups heroImgData={heroImgData} heroData={heroData} />}/>
          <Route path='/meta/matchups/NotFound' element={<NotFound />}/>
        </Route>
        <Route path="/personaltracker" element={<PersonalTracker />}>
          <Route path='/personaltracker/create' element={<Create />}/>
          <Route path='/personaltracker/edit/:id' element={<Edit />}/>
          <Route path='/personaltracker/graph' element={<Graph />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
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