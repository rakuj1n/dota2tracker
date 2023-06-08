import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Matchups(props) {
    const {id} = useParams()
    const [matchUps,setMatchUps] = useState([])

    async function fetchMatchUp() {
        const response = await fetch(`https://api.opendota.com/api/heroes/${id}/matchups`)
        const jsonMatchUpData = await response.json()
        setMatchUps(jsonMatchUpData)
    }
    useEffect(() => {
        fetchMatchUp()
    },[id])

    function idToHero(heroId) {
        let hero = props.heroData.find((item) => item.id === heroId)
        return hero?.localized_name
    }

    return (
        <>
        <h1>Matchups for Hero {id}</h1>
        {matchUps && matchUps.sort((a,b) => {
            return (b.wins/b.games_played) - (a.wins/a.games_played)
        }).map((item) => {
            return (
                <div>
                    <p>{idToHero(item.hero_id)}</p>
                    <p>{item.wins}/{item.games_played}, {Math.round(item.wins/item.games_played*100)}% winrate</p>
                    <hr/>
                </div>
            )
        })}
        </>
    )
}