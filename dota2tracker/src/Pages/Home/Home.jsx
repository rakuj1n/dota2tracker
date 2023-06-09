import Leagues from "./Leagues"
import { Outlet } from "react-router-dom"

export default function Home() {

    return (
        <>
            <h1>Home Page</h1>
            <h2>Leagues</h2>
            <Leagues />
            <Outlet />
        </>
    )
}