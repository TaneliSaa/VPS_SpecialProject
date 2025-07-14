"use client"

import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


interface LogEntry {
    type: string,
    message: string,
    timestamp: string
}

const ActivityLog: React.FC<{ simulationId: number | null }> = ({ simulationId }) => {

    const { user } = useAuth();
    const [log, setLog] = useState<LogEntry[]>([]);
    const [inputLogs, setInputLogs] = useState<Record<string, string>>({});




    const formatTimeStampForMySQL = () => {
        const now = new Date();
        const startOfTheString = 0;
        const endOfTheString = 19;
        return now.toISOString().slice(startOfTheString, endOfTheString).replace("T", " ");
    }

    const formatTimeForActivityLog = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) {
                return "Invalid time";
            }
            return date.toLocaleTimeString("fi-FI", {
                timeZone: "Europe/Helsinki",
                hour12: false,
            });
        } catch (error) {
            return "Invalid time";
        }
    };


    const addLogEntry = async (type: string, message: string) => {

        if (!user || !user.id) {
            return;
        }

        const newEntry: LogEntry = {
            type,
            message,
            timestamp: formatTimeStampForMySQL(),
        };

        const res = await fetch("/api/activityLog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                simulation_id: simulationId,
                ...newEntry
            }),
        });

        if (res.ok) {
            const logRes = await fetch("/api/activityLog/fetchLogs", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({simulationId}),
            });
            const data = await logRes.json();
            setLog(data.logs || []);
        }

        console.log("Sending log entry: ", {user_id: user.id, simulation_id: simulationId, ...newEntry});
    };



    useEffect(() => {

        if (!user || !simulationId) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const minimalValue = 0;
            if (target.tagName === "BUTTON") {
                const buttonText = target.innerText.toLowerCase();
                addLogEntry("Button Click", `Clicked button: ${target.innerText}`);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }

    }, [user,simulationId])

    return (
        <div className="activityLog">
            <h2 className="text-lg font-semibold">
                Activity Log
            </h2>
            <ul className="mt-2 space-y-2">
                {log
                    .map((entry, index) => (
                        <li key={index} className="border-b py-1">
                            <span className="font-semibold">{entry.type}</span>:
                            {entry.message}
                            <span className=""> {formatTimeForActivityLog(entry.timestamp)}</span>

                        </li>
                    ))

                }

            </ul>
        </div>
    )

}

export default ActivityLog;