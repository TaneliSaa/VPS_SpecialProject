"use client";

import { useState } from "react";

interface Props {
    simulationId: number | null;
}



const PatientDialogue = ({ simulationId }: Props) => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const talkToPatient = async () => {
        const res = await fetch("/api/patientDialogue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: input,
                simulation_id: simulationId
            }),
        });

        const data = await res.json();
        console.log("Dialogue message: ", data.message.answer);
        setResponse(data.message.answer);
    };




    return (

        <div>
            <textarea
                className="w-[550px] h-[200px] border border-gray-400 rounded p-2 resize-none translate-x-40"
                placeholder="Patient responses area"
                value={response}
                readOnly
            >

            </textarea>

            <input
                className="w-[550px] h-[50px] border border-gray-400 rounded p-2 resize-none translate-x-40"
                placeholder="Your questions here"
                name="Patient question input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                name="submit"
                onClick={talkToPatient}
                className="btn btn-primary translate-x-42"
            >
                Submit
            </button>
        </div>

    )
}

export default PatientDialogue;