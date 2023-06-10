import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function SavedDataList() {

    const [savedDataList,setSavedDataList] = useState()

    async function fetchSavedData() {
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches?maxRecords=20&view=Grid%20view`,{
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
            }
        })
        const jsonSavedData = await response.json()
        setSavedDataList(jsonSavedData)
    }

    useEffect(()=>{
        fetchSavedData()
    },[])

    function capitalise(str) {
        let [a,...rest] = str
        let result = [a.toUpperCase(),...rest]
        return result.join('')
    }

    return (
        <>
            <p>This is the saved list</p>
            <p><Link to='/personaltracker/create'>Add</Link></p>
            {savedDataList && savedDataList.records.map((item) => {
                return (
                    <>
                        <div className="saveddatalistitem">
                            <div>{capitalise(item.fields.heroplayed)}</div>
                            <div>Result: {item.fields.winloss}</div>
                            <div>Position: {item.fields.rolepositionplayed}</div>
                            <div>Date: {item.fields.datetimeplayed}</div>
                        </div>
                    </>
                )
            })}
        </>
    )
}