import { useState, useEffect } from "react"

export default function Leagues() {
    const [leagues, setLeagues] = useState([])

    async function fetchLeagues() {
        const response = await fetch(`https://api.opendota.com/api/leagues`)
        const jsonLeagueData = await response.json()
        setLeagues(jsonLeagueData)
    }

    useEffect(()=>{
        fetchLeagues()
    }
    ,[])


    return (
        <>
        {leagues && leagues.map(() => {
            return (
                <section>
                    <div></div>
                </section>
            )
        })}
        </>
    )
}