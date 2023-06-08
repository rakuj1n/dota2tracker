import { useParams } from "react-router-dom"

export default function Matchups() {
    const {id} = useParams()

    return (
        <>
        <h1>matchups</h1>
        </>
    )
}