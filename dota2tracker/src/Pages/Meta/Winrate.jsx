import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Winrate(props) {
    const {role} = useParams()
    const [list,setList] = useState()

    console.log(props.metaData)

    function idToHero(heroId) {
        let hero = props.heroData.find((item) => item.id === heroId)
        return hero?.localized_name
    }

    useEffect(() => {
        let filteredList = props.metaData.filter((item)=>{ 
            return item.lane_role == role
        })

        let sortedList = filteredList.sort((a,b) => {
            return b.wins/b.games - a.wins/a.games
        })
    
        setList(sortedList)
    },[role,props.metaData])

    return(
        <>
        <h2>Winrates for Position {role}</h2>
        <div className="winratelist">
        {list && list.map((item) => {
            return (
                <div>
                    <p>{idToHero(item.hero_id)}  </p>
                    <p>{item.wins}/{item.games} {Math.round(item.wins/item.games*100)}% winrate</p>
                    <hr/>
                </div>
            )
        })}
        </div>
        </>
    )
}