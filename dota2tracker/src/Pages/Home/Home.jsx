// import Leagues from "./Leagues"
import { Outlet } from "react-router-dom"
import LeagueSlider from './LeagueSlider'


export default function Home() {

    return (
        <>
            <h1>Leagues</h1>

            <LeagueSlider />
            {/* <Leagues /> */}
            <Outlet />
        </>
    )
}