import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const RootPage: React.FC = () => {
    return (
        <>
            <div className="container">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}
export default RootPage
