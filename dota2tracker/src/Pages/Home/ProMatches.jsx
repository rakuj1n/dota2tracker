import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../Loading"

export default function ProMatches(props) {
    const [proMatchData,setProMatchData] = useState([])
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false)


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

    return (
        <>
        <h2>Matches played</h2>
        {isLoading && <Loading />}
        {proMatchData && !isLoading && proMatchData.map((item) => {
            return (
                <section>
                    <div>{item.radiant_win ? "Radiant Win" : "Dire Win"}</div>
                    <div>
                        <img width="10%"src={idToPic(item.radiant_team_id)}/>
                        {idToName(item.radiant_team_id) || item.radiant_team_id} || {item.radiant_score} : {item.dire_score} || {idToName(item.dire_team_id) || item.dire_team_id}
                        <img width="10%"src={idToPic(item.dire_team_id)}/>
                    </div>
                    <div>{item.duration}</div>
                    <div>{item.leagueid}</div>
                    <hr/>
                </section>
            )
        })}
        </>
    )
}