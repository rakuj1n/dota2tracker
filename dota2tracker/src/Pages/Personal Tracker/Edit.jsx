import { useState, useEffect } from "react"
import searchDictionary from "../../searchDictionary"
import { useNavigate, useOutletContext, Link, useParams } from "react-router-dom"
import { Button } from "antd"
import Loading from "../../Loading"

export default function Edit() {
    const [isLoading,setIsLoading] = useState(false)
    const {id} = useParams()
    const [selectedItemData,setSeletectedItemData] = useState()
    const {fetchSavedData} = useOutletContext()
    const [invalid,setInvalid] = useState(false)

    async function fetchSelectedItemData() {
        setIsLoading(true)
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches/${id}`,{
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
            }
        })
        const jsonSelectedItemData = await response.json()
        console.log("fetching item data", jsonSelectedItemData)
        delete jsonSelectedItemData.createdTime
        let datetime = jsonSelectedItemData.fields.datetimeplayed.slice(0,-5)
        jsonSelectedItemData.fields.datetimeplayed = datetime
        setSeletectedItemData(jsonSelectedItemData)
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchSelectedItemData()
    },[id])

    function handleChange(e) {
        setSeletectedItemData((prev) => {
            return {
                ...prev,
                "fields": {
                    ...prev.fields,
                    [e.target.name]: e.target.value
                }
            }
        })
        console.log(selectedItemData)
    }

    async function postEdit() {
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches`,{
            method: 'PATCH',
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
         },
            body: JSON.stringify({records:[selectedItemData]}) 
        })
        const jsonData = await response.json()
        fetchSavedData()
    }

    const navigate = useNavigate()

    function handleSubmitEdit(e) {
        e.preventDefault()
        let id = search()
        if (id == undefined || selectedItemData.fields.datetimeplayed == "") {
            return setInvalid(true)
        } else {
            setInvalid(false)
            postEdit()
            // .then(fetchSavedData())
            navigate(`/personaltracker/graph`)
        }
        
    }

    function search() {
        for (let key in searchDictionary) {
            let regexPattern = new RegExp(key)
            if (regexPattern.test(selectedItemData.fields.heroplayed)) {
              let value = searchDictionary[key]
              return value
            }
        }
    }

    // <div className="closecreate"><Link to='/personaltracker/graph'><CloseOutlined className="closecreatebutton"/></Link></div>

    return (
        <>  
            {isLoading && <Loading />}
            { selectedItemData && !isLoading &&
            <form className='createnewform' onSubmit={handleSubmitEdit}>
                <h3>Edit Entry</h3>
                <label>Hero Played: <input className='newforminput' name='heroplayed' onChange={handleChange} value={selectedItemData.fields.heroplayed} type="text" placeholder="enchantress"></input></label>
                { invalid && <small style={{color:'red'}}>Please check the entered hero name.</small>}
                <label>Win/Loss: 
                    <select className='newforminput' name='winloss' onChange={handleChange} value={selectedItemData.fields.winloss}>
                        <option value={"Win"}>Win</option>
                        <option value={"Loss"}>Loss</option>
                    </select>
                </label>
                <label>Date/Time Played: <input className='newforminput' name='datetimeplayed' onChange={handleChange} type='datetime-local' value={selectedItemData.fields.datetimeplayed}></input></label>
                { invalid && <small style={{color:'red'}}>Please check the entered date and time.</small>}
                <label>Role Position Played: 
                    <select className='newforminput' value={selectedItemData.fields.rolepositionplayed} onChange={handleChange} name='rolepositionplayed'>
                        <option value={1}>1 (carry)</option>
                        <option value={2}>2 (mid)</option>
                        <option value={3}>3 (off)</option>
                        <option value={4}>4 (soft support)</option>
                        <option value={5}>5 (hard support)</option>
                    </select>
                </label>

                <Button style={{marginTop:'40px'}} className='newentrybutton' htmlType="submit" ghost>Submit Edit</Button>
                <Link to='/personaltracker/graph'><Button style={{scale:'0.85'}} danger ghost>Discard Changes</Button></Link>
            </form>}
        </>
    )
}