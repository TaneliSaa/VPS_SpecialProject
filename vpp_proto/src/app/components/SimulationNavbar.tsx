"use client"

import { useAuth } from "./AuthContext"

export default function SimulationNavbar() {

    const { user } = useAuth();


    return (
        <nav className="navbarStyle">
            <div>
                {user ? <p>Welcome, {user.username} to: </p> : <p>Not logged in</p>}
            </div>
            <p>Special Project Virtual Patient Simulations</p>
        </nav>
    );

}