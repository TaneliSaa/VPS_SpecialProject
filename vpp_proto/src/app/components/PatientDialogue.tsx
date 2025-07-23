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
                className="patientResponseTextArea"
                placeholder="Patient responses area"
                value={response}
                readOnly
            >

            </textarea>

            <div className="questionInputBox">

                <input
                    className="userQuestionInputArea"
                    placeholder="Your questions here"
                    name="Patient question input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    name="submit"
                    onClick={talkToPatient}
                    className="btn btn-primary"
                >
                    Submit
                </button>


            </div>

        </div>

    )
}

export default PatientDialogue;