import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Meta() {

    const [roleSelected,setRoleSelected] = useState(1)
    const [data,setData] = useState("")
    const navigate = useNavigate()

    function handleSubmitWinrate(e) {
        e.preventDefault()
        navigate(`/meta/${roleSelected}`)

    }

    function handleChange(e) {
        setRoleSelected(e.target.value)
    }

    function handleChangeMatchup(e) {
        setData(e.target.value)
    }

    function handleSubmitMatchup(e) {
        e.preventDefault()
        navigate(`/meta/matchups/${data}`)
    }

    return (
        <>
            <h1>Meta page</h1>
            <form onSubmit={handleSubmitWinrate}>
                <label>Select a role position: 
                    <select onChange={handleChange} value={roleSelected.role} name="role">
                        <option value={1}>1 (carry)</option>
                        <option value={2}>2 (mid)</option>
                        <option value={3}>3 (off)</option>
                        <option value={4}>4 (jungle)</option>
                    </select>
                </label>
                <button>Get Lane-Hero Winrate</button>
            </form>
            <form onSubmit={handleSubmitMatchup}>
                <label>Search a Hero for its matchups: 
                    <input onChange={handleChangeMatchup} value={data} name="matchup"></input>
                </label>
                <button>Get Lane-Hero Winrate</button>
            </form>
            <Outlet />
        </>
    )
}