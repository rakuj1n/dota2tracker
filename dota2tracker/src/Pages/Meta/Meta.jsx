import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Meta() {

    // const [metaData,setMetaData] = useState([])
    // const [heroData,setHeroData] = useState([])
    const [roleSelected,setRoleSelected] = useState(1)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        // take metaData state and reduce it so that all objects with same 
        // hero_id and lane_role combine their wins # and games # into one object
        navigate(`/meta/${roleSelected}`)
        // let filteredList = reducedMetaData.filter((item)=>{ 
        //     return item.lane_role == roleSelected
        // })
        // setList(filteredList)
    }

    function handleChange(e) {
        setRoleSelected(e.target.value)
    }

    // async function fetchMeta() {
    //     const response = await fetch(`https://api.opendota.com/api/scenarios/laneRoles`)
    //     const jsonMetaData = await response.json()

    //     let reducedMetaData = jsonMetaData.reduce((acc, curr) => {
    //         if ((acc.some((x) => (x["hero_id"] === curr["hero_id"] &&
    //          x["lane_role"] === curr["lane_role"])))) {
    //             let idx = acc.findIndex((x)=> (x["hero_id"] === curr["hero_id"] &&
    //             x["lane_role"] === curr["lane_role"]))
    //             let newData = {
    //                 "hero_id":acc[idx]["hero_id"],
    //                 "lane_role":acc[idx]["lane_role"],
    //                 "games": parseInt(acc[idx]["games"]) + parseInt(curr["games"]),
    //                 "wins": parseInt(acc[idx]["wins"]) + parseInt(curr["wins"])
    //             }
    //             acc.splice(idx,1)
    //             return [...acc,newData]
    //         } else {
    //             acc.push(curr)
    //             return acc
    //         }
    //     },[{
    //         "hero_id":null,
    //         "lane_role":null,
    //         "games":"",
    //         "wins":""
    //     }])

    //     setMetaData(reducedMetaData)
    // }

    // async function fetchHero() {
    //     const response = await fetch(`https://api.opendota.com/api/heroes`)
    //     const jsonMetaData = await response.json()
    //     setHeroData(jsonMetaData)
    // }

    // useEffect(() => {
    //     // fetchMeta()
    //     fetchHero()
    // },[])

    return (
        <>
            <h1>Meta page</h1>
            <form onSubmit={handleSubmit}>
                <label>Select a role position: 
                    <select onChange={handleChange} value={roleSelected.role} name="role">
                        <option value={1}>1 (carry)</option>
                        <option value={2}>2 (mid)</option>
                        <option value={3}>3 (off)</option>
                        <option value={4}>4 (jungle)</option>
                    </select>
                </label>
                <button>Get Meta</button>
            </form>
            <Outlet />
        </>
    )
}