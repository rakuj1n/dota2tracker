import { Carousel } from 'antd';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function LeagueSlider() {

   const [leagues, setLeagues] = useState([])

    async function fetchLeagues() {
        const response = await fetch(`https://api.opendota.com/api/leagues`)
        const jsonLeagueData = await response.json()
        setLeagues(jsonLeagueData.filter((item) => {
            return item.tier === "premium" && item.name !== "adsf" && item.name.includes("2023")
        }))
    }

    useEffect(()=>{
        fetchLeagues()
    }
    ,[])

  const contentStyle= {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#E8AA42',
  };

  return (
    <Carousel autoplay>
      {leagues && leagues.map((item) => {
            return (
                    <div><Link style={contentStyle} className="link" to={`/leagues/${item.leagueid}`}>{item.name} || {item.leagueid}</Link></div>
            )
        })}
  </Carousel>
  )
}



