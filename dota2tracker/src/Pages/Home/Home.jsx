// import Leagues from "./Leagues"
import { Outlet } from "react-router-dom"
import LeagueSlider from './LeagueSlider'


export default function Home() {

    return (
        <>
            <h1>Home Page</h1>
            <h2>Leagues</h2>
            <LeagueSlider />
            {/* <Leagues /> */}
            <Outlet />
        </>
    )
}