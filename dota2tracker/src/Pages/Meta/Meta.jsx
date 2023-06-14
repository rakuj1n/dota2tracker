import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import searchDictionary from "../../searchDictionary"
import { Button } from 'antd'
import herolist from "../../herolist"
import { CloseCircleFilled, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons"

export default function Meta() {

    const [filteredData,setFilteredData] = useState([])
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
        let newFilter = herolist.filter((item) => item.toLowerCase().startsWith(e.target.value.toLowerCase()))
        if (e.target.value === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    function handleSubmitMatchup(e) {
        e.preventDefault()
        let id = search()
        setFilteredData([])
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

    function setValue(item) {
        setData(item)
        setFilteredData([])
    }

    function handleClickCloseList() {
        setFilteredData([])
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
                        <div className="searchbar">
                            <div className="searchinput"><input placeholder="enchantress" className='inputfields' onChange={handleChangeMatchup} type="" value={data} name="matchup" autoComplete="off"></input></div>
                            { filteredData.length > 0 && <div onClick={handleClickCloseList} className="closelist"><CloseOutlined /></div>}
                            { filteredData.length > 0 && <div className="results">{filteredData.map((item) => <div onClick={() => setValue(item)} className="resultsitem">{item}</div>)}</div>}
                        </div>
                    </label>
                    <Button htmlType="submit" ghost>Get Hero Matchups</Button>
                </form>
            </div>
            <Outlet />
        </>
    )
}