import { useEffect, useState } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useOutletContext } from "react-router-dom"
import Loading from '../../Loading'



export default function Graph() {
    const {trigger} = useOutletContext()
    const [savedDataList,setSavedDataList] = useState()
    const [isLoading,setIsLoading] = useState(false)

    const [win, setWin] = useState(0)
    const [loss, setLoss] = useState(0)

    async function fetchSavedData() {
        setIsLoading(true)
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches?sort%5B0%5D%5Bfield%5D=datetimeplayed&sort%5B0%5D%5Bdirection%5D=desc`,{
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
    },[trigger])

    useEffect(() => {
        setWin(winLossReducer(savedDataList ? savedDataList : {records: []})[0]) 
        setLoss(winLossReducer(savedDataList ? savedDataList : {records: []})[1]) 
    },[savedDataList])

    function winLossReducer(arr) { 
        let win = 0
        let loss = 0
        return arr?.records.reduce((acc,curr) => {
            if (curr.fields.winloss === "Win") {
                win++
            } else { loss++ }
            acc = [win, loss]
            return acc
        },[])
    }

    return (
        <div className='graph'> 
        {isLoading && <Loading />}
        {!isLoading &&
            <BarChart margin={{top: 0, right:0,bottom:0,left:0}} width={300} height={250} data={[{"name":"Wins","No. of Games":win ? win : 0},{"name":"Losses","No. of Games":loss ? loss : 0}]}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis tick={{ fill: '#DDE6ED' }} dataKey="name" />
            <YAxis tick={{ fill: '#DDE6ED' }} allowDecimals={false}/>
            <Tooltip />
            <Bar dataKey="No. of Games" fill="#9DB2BF" />
        </BarChart>}
        </div>
    )
}