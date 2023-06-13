import { Outlet } from "react-router-dom";
import SavedDataList from "./SavedDataList";
import { useEffect, useState } from "react"
import Loading from "../../Loading";


export default function PersonalTracker() {

    const [savedDataList,setSavedDataList] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [trigger,setTrigger] = useState(false)

    async function fetchSavedData() {
        setIsLoading(true)
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches?sort%5B0%5D%5Bfield%5D=datetimeplayed&sort%5B0%5D%5Bdirection%5D=desc`,{
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
            }
        })
        const jsonSavedData = await response.json()
        console.log("fetching", jsonSavedData)
        setSavedDataList(jsonSavedData)
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchSavedData()
    },[])

    function onDelete(id) {
        async function handleDelete() {
            setIsLoading(true)
            const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches/${id}`,{
                method: "DELETE",
                headers: { 
                    "Authorization": "Bearer keyXONOjTEfPlXn4b"
                }
            })
            const jsonData = await response.json()
            setIsLoading(false)
            //visual re-render
            setSavedDataList(prev => { 
                return {"records":(prev.records.filter((item) => {return item.id != id}))}
                }
            )
            //graph trigger re-render
            setTrigger(prev => !prev)
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
                    <Outlet context={{fetchSavedData, trigger}}/>
                </div>
            </div>
        </>
    )
}