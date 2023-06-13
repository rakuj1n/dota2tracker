import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import searchDictionary from "../../searchDictionary"
import { Button } from 'antd'

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
        let id = search()
        navigate(`/meta/matchups/${id ? id : "NotFound"}`)
    }

    function search() {
        for (let key in searchDictionary) {
            let regexPattern = new RegExp(key)
            if (regexPattern.test(data)) {
              let value = searchDictionary[key]
              return value
            }
        }
    }

    return (
        <>
            <h1>Meta Finder</h1>
            <div className="container">
                <form onSubmit={handleSubmitWinrate}>
                    <label>Select a role position: <br/>
                        <select className='inputfields' onChange={handleChange} value={roleSelected.role} name="role">
                            <option value={1}>1 (carry)</option>
                            <option value={2}>2 (mid)</option>
                            <option value={3}>3 (off)</option>
                            <option value={4}>4 (jungle)</option>
                        </select>
                    </label>
                    <Button htmlType="submit" ghost>Get Lane-Hero Winrate</Button>
                </form>
                <form onSubmit={handleSubmitMatchup}>
                    <label>Search a Hero for its matchups: 
                        <input placeholder="enchantress" className='inputfields' onChange={handleChangeMatchup} type="" value={data} name="matchup" autoComplete="off"></input>
                    </label>
                    <Button htmlType="submit" ghost>Get Hero Matchups</Button>
                </form>
            </div>
            <Outlet />
        </>
    )
}