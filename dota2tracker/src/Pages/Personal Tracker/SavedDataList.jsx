import { DeleteOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function SavedDataList(props) {

    function capitalise(str) {
        let [a,...rest] = str
        let result = [a.toUpperCase(),...rest]
        return result.join('')
    }
    
    return (
        <div className="saveddatalistbox">
            <div className="adddiv"><Link to='/personaltracker/create'><PlusCircleOutlined className="addbutton"/></Link></div>
            <div className="space"></div>
            {props.savedDataList && props.savedDataList.records.map((item) => {
                return (
                    <>
                        <div className="saveddatalistitem" id={item.id}>
                            <div className="item1">{capitalise(item.fields.heroplayed)}</div>
                            <div className='item2'styles={{textAlign:'right'}}>{item.fields.winloss}</div>
                            <div className="item3">Pos: {item.fields.rolepositionplayed}</div>
                            {/* <div>Date: {item.fields.datetimeplayed.slice(0,10)}</div> */}
                            <div className="delete"><DeleteOutlined onClick={()=>props.onDelete(item.id)}/></div>
                        </div>
                        <hr/>
                    </>
                )
            })}
        </div>
    )
}