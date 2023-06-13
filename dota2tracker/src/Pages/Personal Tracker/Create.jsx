import { useState } from "react"
import searchDictionary from "../../searchDictionary"
import { useNavigate, useOutletContext, Link } from "react-router-dom"
import { Button } from "antd"
import { CloseCircleFilled, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons"


export default function Create() {
    const {fetchSavedData} = useOutletContext()
    const [invalid,setInvalid] = useState(false)
    const [createFormData,setCreateFormData] = useState({
        heroplayed: "", 
        winloss: "Win", 
        datetimeplayed: "",
        rolepositionplayed: "1"
    })

    function handleChange(e) {
        setCreateFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    async function postCreate() {
        const response = await fetch(`https://api.airtable.com/v0/appMTfwuwe3zlOU6o/matches`,{
            method: 'POST',
            headers: { 
                "Content-type": "application/json",
                "Authorization": "Bearer keyXONOjTEfPlXn4b"
         },
            body: JSON.stringify({"records":[{"fields":createFormData}]}) 
        })
        const jsonData = await response.json()
        fetchSavedData()
    }

    const navigate = useNavigate()

    function handleSubmitCreate(e) {
        e.preventDefault()
        let id = search()
        console.log(id,createFormData)
        if (id == undefined || createFormData.datetimeplayed == "") {
            return setInvalid(true)
        } else {
            setInvalid(false)
            postCreate()
            // .then(fetchSavedData())
            navigate(`/personaltracker/graph`)
        }
        
    }

    function search() {
        for (let key in searchDictionary) {
            let regexPattern = new RegExp(key)
            if (regexPattern.test(createFormData.heroplayed)) {
              let value = searchDictionary[key]
              return value
            }
        }
    }

    // <div className="closecreate"><Link to='/personaltracker/graph'><CloseOutlined className="closecreatebutton"/></Link></div>

    return (
        <>  
            <form className='createnewform' onSubmit={handleSubmitCreate}>
                <h3 style={{color:'#FFFFB4'}}>Create a New Entry</h3>
                <label>Hero Played: <input className='newforminput' name='heroplayed' onChange={handleChange} value={createFormData.heroplayed} type="text" placeholder="enchantress" autoComplete="off"></input></label>
                { invalid && <small style={{color:'red'}}>Please check the entered hero name.</small>}
                <label>Win/Loss: 
                    <select className='newforminput' name='winloss' onChange={handleChange} value={createFormData.winloss}>
                        <option value={"Win"}>Win</option>
                        <option value={"Loss"}>Loss</option>
                    </select>
                </label>
                <label>Date/Time Played: <input className='newforminput' name='datetimeplayed' onChange={handleChange} type='datetime-local'></input></label>
                { invalid && <small style={{color:'red'}}>Please check the entered date and time.</small>}
                <label>Role Position Played: 
                    <select className='newforminput' value={createFormData.rolepositionplayed} onChange={handleChange} name='rolepositionplayed'>
                        <option value={1}>1 (carry)</option>
                        <option value={2}>2 (mid)</option>
                        <option value={3}>3 (off)</option>
                        <option value={4}>4 (soft support)</option>
                        <option value={5}>5 (hard support)</option>
                    </select>
                </label>

                <Button style={{marginTop:'40px'}} className='newentrybutton' htmlType="submit" ghost>Create New Entry</Button>
                <Link to='/personaltracker/graph'><Button style={{scale:'0.95'}} danger ghost>Discard Changes</Button></Link>
            </form>
        </>
    )
}