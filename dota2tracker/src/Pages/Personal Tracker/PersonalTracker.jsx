import { Outlet } from "react-router-dom";
import SavedDataList from "./SavedDataList";



export default function PersonalTracker() {
    return (
        <>
            <h1>Track Your Game Stats</h1>
            <div className="PTgrid">
                <div>
                    <SavedDataList />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}