import { useState,useEffect } from "react"

export default function ProMatches() {
    const [proMatchData,setProMatchData] = useState([])

    async function fetchProMatch() {
        const response = await fetch(`https://api.opendota.com/api/proMatches`)
        const jsonProMatchData = await response.json()
        setProMatchData(jsonProMatchData)
    }

    useEffect(()=>{
        fetchProMatch()
    }
    ,[])

    return (
        <>
        {proMatchData && proMatchData.map((item) => {
            return (
                <section>
                    <div>{item.radiant_win ? "Radiant Win" : "Dire Win"}</div>
                    <div>{item.radiant_name ? item.radiant_name : "Unidentified"} {item.radiant_score} : {item.dire_score} {item.dire_name ? item.dire_name : "Unidentified"}</div>
                    <div>{item.duration}</div>
                    <div>{item.league_name}, {item.series_type}</div>
                    <hr/>
                </section>
            )
        })}
        </>
    )
}