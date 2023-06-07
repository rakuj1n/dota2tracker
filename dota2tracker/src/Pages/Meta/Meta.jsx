import { useEffect, useState } from "react"

export default function Meta() {

    const [metaData,setMetaData] = useState([])
    const [roleSelected,setRoleSelected] = useState(1)
    const [list,setList] = useState([])


    function handleSubmit(e) {
        e.preventDefault()
        let filteredList = metaData.filter((item)=>{
            return item.lane_role == roleSelected
        })
        setList(filteredList)
    }

    function handleChange(e) {
        setRoleSelected(e.target.value)
    }

    async function fetchMeta() {
        const response = await fetch(`https://api.opendota.com/api/scenarios/laneRoles`)
        const jsonMetaData = await response.json()
        setMetaData(jsonMetaData)
    }

    useEffect(() => {
        fetchMeta()
    },[])

    let sortedList = list.sort((a,b) => {
        return b.wins/b.games - a.wins/a.games
    })

    return (
        <>
            <h1>Meta page</h1>
            <form onSubmit={handleSubmit}>
                <label>Select a role position: 
                    <select onChange={handleChange} value={roleSelected.role} name="role">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </label>
                <button>Get Meta</button>
            </form>
            {sortedList && sortedList.map((item) => {
                return (
                    <div>
                        <p>{item.hero_id}, {item.wins}/{item.games} {Math.round(item.wins/item.games*100)}% winrate</p>
                    </div>
                )
            })}
        </>
    )
}