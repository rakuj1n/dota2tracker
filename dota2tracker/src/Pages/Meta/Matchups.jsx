import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../Loading"

export default function Matchups(props) {
    const {id} = useParams()
    const [matchUps,setMatchUps] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function fetchMatchUp() {
        setIsLoading(true)
        const response = await fetch(`https://api.opendota.com/api/heroes/${id}/matchups`)
        const jsonMatchUpData = await response.json()
        setMatchUps(jsonMatchUpData)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchMatchUp()
    },[id])

    function idToHero(heroId) {
        let hero = props.heroData.find((item) => item.id === heroId)
        return hero?.localized_name
    }

    function idToImg(heroId) {
        let hero = props.heroImgData[heroId]
        return hero?.img 
    }

    return (
        <>
        <h2>Matchups for <span className="spanmatchup">{idToHero(parseInt(id))}</span> </h2>
        {isLoading && <Loading />}
        <div className="winratelist">
        {matchUps && !isLoading && matchUps.sort((a,b) => {
            return (b.wins/b.games_played) - (a.wins/a.games_played)
        }).map((item) => {
            return (
                <div className="matchuplistitem">
                    <img src={`https://cdn.dota2.com/${idToImg(parseInt(item.hero_id))}`} />
                    <p>Against <strong>{idToHero(item.hero_id)}</strong>  </p>
                    <p>{item.wins}/{item.games_played} wins, <strong>{Math.round(item.wins/item.games_played*100)}% winrate</strong></p>
                </div>
            )
        })}
        </div>
        </>
    )
}