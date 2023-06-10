import { Outlet } from "react-router-dom";
import SavedDataList from "./SavedDataList";
import { useEffect, useState } from "react"
import Loading from "../../Loading";


export default function PersonalTracker() {

    const [savedDataList,setSavedDataList] = useState()
    const [isLoading,setIsLoading] = useState(false)

    async function fetchSavedData() {
        setIsLoading(true)
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches?maxRecords=20&view=Grid%20view`,{
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
            }
        })
        const jsonSavedData = await response.json()
        setSavedDataList(jsonSavedData)
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchSavedData()
    },[])

    function onDelete(id) {
        async function handleDelete() {
            const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches/${id}`,{
                method: "DELETE",
                headers: { 
                    "Authorization": "Bearer keyXONOjTEfPlXn4b"
                }
            })
            const jsonData = await response.json()
            console.log(jsonData)
        }
        handleDelete(id)
    }


    return (
        <>
            <h1>Track Your Game Stats</h1>
            <div className="PTgrid">
                <div>
                    {isLoading && <Loading />}
                    {savedDataList && !isLoading && <SavedDataList onDelete={onDelete} savedDataList={savedDataList}/>}
                </div>
                <div className="outlet">
                    <Outlet />
                </div>
            </div>
        </>
    )
}