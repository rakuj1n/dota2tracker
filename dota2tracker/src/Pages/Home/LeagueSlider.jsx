import { Carousel } from 'antd';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loading from '../../Loading';
import {LeftOutlined,RightOutlined} from '@ant-design/icons'


export default function LeagueSlider() {

   const [leagues, setLeagues] = useState([])
   const [isLoading, setIsLoading] = useState(false)

    async function fetchLeagues() {
      setIsLoading(true)
        const response = await fetch(`https://api.opendota.com/api/leagues`)
        const jsonLeagueData = await response.json()
        setLeagues(jsonLeagueData.filter((item) => {
            return item.tier === "premium" && item.name !== "adsf" && item.name.includes("2023")
        }))
      setIsLoading(false)
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
    margin: 'auto 5px',
    borderRadius: '25px',
    // padding: '2%',
    // paddingTop: '3%',
    padding: '0 2%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
  <>
    {isLoading ? <Loading /> : <Carousel autoplay dots={false} arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
      {leagues && leagues.map((item) => {
            return (
                    <div><div style={contentStyle}><Link className="leaguelink" to={`/leagues/${item.leagueid}`}>{item.name}</Link></div></div>
            )
        })}
  </Carousel>}
  </>
  )
}



