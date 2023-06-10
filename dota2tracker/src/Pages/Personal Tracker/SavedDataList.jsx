import { Link } from "react-router-dom"

export default function SavedDataList() {
    return (
        <>
            <p>This is the saved list</p>
            <p><Link to='/personaltracker/create'>Add</Link></p>
        </>
    )
}