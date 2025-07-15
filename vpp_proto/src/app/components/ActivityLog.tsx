"use client"

import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


interface Props {
    simulationId: number | null;
}


interface LogEntry {
    type: string,
    message: string,
    timestamp: string
}

const ActivityLog = ({simulationId} : Props) => {

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ simulationId }),
            });
            const data = await logRes.json();
            setLog(data.logs || []);
        }

        console.log("Sending log entry: ", { user_id: user.id, simulation_id: simulationId, ...newEntry });
    };



    useEffect(() => {

        if (!user || !simulationId) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const minimalValue = 0;
            const buttonText = target.innerText.toLowerCase();
            if (target.tagName === "BUTTON") {
                addLogEntry("Button Click", `Clicked button: ${target.innerText}`);

                if (buttonText.includes("submit")) {
                    if (Object.keys(inputLogs).length > minimalValue) {
                        for (const field in inputLogs) {
                            addLogEntry("Text Input", `Typed in ${field}: "${inputLogs[field]}"`);
                        }
                        setInputLogs({});
                    }
                }
            }
        };

        const handleInput = (event: Event) => {
            const target = event.target as HTMLInputElement | HTMLTextAreaElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
                const fieldName = target.getAttribute("name") || "unknown";
                setInputLogs((prev) => ({
                    ...prev,
                    [fieldName]: target.value,
                }));
            }
        }

        document.addEventListener("click", handleClick);
        document.addEventListener("input", handleInput);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("input", handleInput);
        }

    }, [user, inputLogs, simulationId])

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