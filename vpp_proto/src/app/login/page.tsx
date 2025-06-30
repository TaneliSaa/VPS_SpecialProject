"use client"
import Link from "next/link";
import { useState } from "react";

export default function Page() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();


        const res = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({username, password}),
        });

        if (res.ok) {
            alert("Login succesful!");
            window.location.href = "/simulation_selection";
        } else {
            alert("Login failed!");
        }
    }

    return (
        <div >
            



            <div className="testBox">
                <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">

                    <h1 className="heading1">Login</h1>
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <Link href="home">
                        <button className="btn btn-primary">Back</button>
                    </Link>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>

                </form>

            </div>




        </div>
    )
}