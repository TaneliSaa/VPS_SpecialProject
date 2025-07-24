"use client"
import { useEffect, useState } from "react";
import Draggable from "react-draggable"

interface Props {
    simulationId: number | null;
    isOpen: Boolean;
    onClose: () => void;
    refreshTrigger: number;
}

const TreatmentPlan = ({ simulationId, onClose, isOpen, refreshTrigger }: Props) => {
    const [treatment, setTreatment] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [currentMedication, setCurrentMedication] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [lifestyle, setLifestyle] = useState("");





    useEffect(() => {
        const loadPlan = async () => {
            const res = await fetch("/api/getUserAnswers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    simulation_id: simulationId,
                }),

            });

            const data = await res.json();

            console.log("DATAAAAA: ", data.answers[0].name);

            if (res.ok && data?.answers) {
                const answers = data.answers[0];
                setName(answers.name || "");
                setSex(answers.sex || "");
                setAge(answers.age || "");
                setMedicalHistory(answers.medical_history || "");
                setCurrentMedication(answers.current_medication || "");
                setSymptoms(answers.symptoms || "");
                setLifestyle(answers.lifestyle || "");
            }
        }
        if (simulationId) {
            loadPlan();
        }


    }, [refreshTrigger]);




    if (!isOpen) return null;
    return (


        <div>
            <div>
                <div>
                    <h2 className="heading2">Treatment Plan</h2>
                    <button className="btn btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>

            <form action="">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
                <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} placeholder="Sex" className="input" />
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input" />
                <input type="text" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} placeholder="Medical history" className="input" />
                <input type="text" value={currentMedication} onChange={(e) => setCurrentMedication(e.target.value)} placeholder="Current medication" className="input" />
                <input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Symptoms" className="input" />
                <input type="text" value={lifestyle} onChange={(e) => setLifestyle(e.target.value)} placeholder="Lifestyle" className="input" />

                <textarea
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="Write treatment plan here..."
                >
                </textarea>
            </form>
        </div>


    );
};
export default TreatmentPlan;