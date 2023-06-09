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
    color: '#025464',
    lineHeight: '',
    textAlign: 'center',
    background: '#E8AA42',
    fontSize: '2rem',
    fontWeight: '500',
    margin: 'auto 5px',
    borderRadius: '25px',
    padding: '0 2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Carousel autoplay>
      {leagues && leagues.map((item) => {
            return (
                    <div><div style={contentStyle}><Link className="leaguelink" to={`/leagues/${item.leagueid}`}>{item.name}</Link></div></div>
            )
        })}
  </Carousel>
  )
}



