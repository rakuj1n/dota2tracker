import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../Loading"
import { Card } from 'antd'

export default function ProMatches(props) {
    const [proMatchData,setProMatchData] = useState([])
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const gridStyle = {
        width: '50%',
        textAlign: 'center',
        // boxShadow:'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
        // boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        color:'#DDE6ED',
        backgroundColor:"#526D82",
    };


    async function fetchProMatch(id) {
        setIsLoading(true)
        const response = await fetch(`https://api.opendota.com/api/leagues/${id}/matches`)
        const jsonProMatchData = await response.json()
        setProMatchData(jsonProMatchData)
        setIsLoading(false)
    }


    useEffect(()=>{
        fetchProMatch(id)
    }
    ,[id])

    function idToName(id) {
        let team = props.teamData.find((item) => item.team_id === id)
        return team?.name
    }

    function idToPic(id) {
        let team = props.teamData.find((item) => item.team_id === id)
        return team?.logo_url
    }

    function idToLeagueName(id) {
        let league = props.leaguesData.find((item) => item.leagueid === parseInt(id))
        return league?.name
    }

    return (
        <>
        <h2 className="header">Matches played</h2>
        {isLoading && <Loading />}
        <div className="winratelist">
        {!isLoading && proMatchData && <Card type='inner' headStyle={{color:'#DDE6ED',backgroundColor:"#526D82"}}title={`League: ${idToLeagueName(id)}`}>
            {proMatchData.map((item) => {
                return (
                    <Card.Grid hoverable={false} style={gridStyle}>
                        <div className='matchitem' style={{fontSize:'1.05rem'}}><img width="15%"src={idToPic(item.radiant_team_id)}/>  {item.radiant_win ? <span className="spanmatchwinner"><strong>Radiant</strong> Win</span> : <span className="spanmatchwinner"><strong>Dire</strong> Win</span>}  <img width="15%"src={idToPic(item.dire_team_id)}/></div>
                        <div>
                            
                            <strong>{idToName(item.radiant_team_id) || item.radiant_team_id}</strong> vs <strong>{idToName(item.dire_team_id) || item.dire_team_id}</strong>
                            
                        </div>
                        <div>{item.radiant_score} : {item.dire_score}</div>
                        {/* <div>{item.duration}</div> */}
                    </Card.Grid>
                )
            })}
        </Card>}
        </div>
        </>
    )
}