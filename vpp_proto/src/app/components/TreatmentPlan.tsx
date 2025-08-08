"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    simulationId: number | null;
    isOpen: Boolean;
    onClose: () => void;
    refreshTrigger: number;
}

const TreatmentPlan = ({ simulationId, onClose, isOpen, refreshTrigger }: Props) => {
    const [treatmentPlan, setTreatmentPlan] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [currentMedication, setCurrentMedication] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [lifestyle, setLifestyle] = useState("");
    const [shortTermGoal, setShortTermGoal] = useState("");
    const [medication, setMedication] = useState("");
    const [longTermGoal, setLongTermGoal] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [diagnosisId, setDiagnosisId] = useState("");
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientDatabaseId");

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

            if (res.ok && data?.answers) {
                const answers = data.answers[data.answers.length - 1];
                setName(answers.name || "");
                setSex(answers.sex || "");
                setAge(answers.age || "");
                setMedicalHistory(answers.medical_history || "");
                setCurrentMedication(answers.current_medication || "");
                setSymptoms(answers.symptoms || "");
                setLifestyle(answers.lifestyle || "");
            }
        };
        if (simulationId) {
            loadPlan();
        }
    }, [refreshTrigger]);

    useEffect(() => {
        const loadDiagnosis = async () => {
            const res = await fetch("/api/getDiagnosis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    simulation_id: simulationId,
                }),
            });
            const data = await res.json();

            if (res.ok && data?.diagnosis) {
                const diagnosisData = data.diagnosis[data.diagnosis.length - 1];
                setDiagnosisId(diagnosisData?.id || "");
                setDiagnosis(diagnosisData?.diagnosis || "");
            }
        }

        if (simulationId) {
            loadDiagnosis();
        }
    }, [refreshTrigger]);


    const saveTreatmentPlan = async () => {
        const res = await fetch("/api/treatmentPlans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                patient_id: patientId,
                prescribed_medication: medication,
                short_term_goals: shortTermGoal,
                long_term_goals: longTermGoal,
                treatment_plan: treatmentPlan,
                simulation_id: simulationId,
                diagnose: diagnosisId,
            }),
        });

        if (res.ok) {
            alert("Treatment plan saved!");
        } else {
            alert("Something went wrong.");
            console.log(res);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="divCentered">
            <div className="treatmentPlanDiv">
                <div className="headingDiv">
                    <h2 className="heading2">Treatment Plan</h2>
                </div>

                <form>
                    <div className="gridCol2">
                        <div>
                            <h2 className="heading3">Name</h2>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
                        </div>

                        <div>
                            <h2 className="heading3">Gender</h2>
                            <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} placeholder="Sex" className="input" />
                        </div>

                        <div>
                            <h2 className="heading3">Age</h2>
                            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="input" />
                        </div>

                        <div>
                            <h2 className="heading3">Current Medication</h2>
                            <input type="text" value={currentMedication} onChange={(e) => setCurrentMedication(e.target.value)} placeholder="Current medication" className="input" />
                        </div>
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Lifestyle</label>
                        <textarea
                            className="textAreaRounded"
                            value={lifestyle}
                            onChange={(e) => setLifestyle(e.target.value)}
                            placeholder="Enter lifestyle"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Medical history</label>
                        <textarea
                            className="textAreaRounded"
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                            placeholder="Enter medical history"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Medications</label>
                        <textarea
                            className="textAreaRounded"
                            value={medication}
                            onChange={(e) => setMedication(e.target.value)}
                            placeholder="Enter medications"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Symptoms</label>
                        <textarea
                            className="textAreaRounded"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Enter symptoms"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Diagnosis</label>
                        <textarea
                            className="textAreaRounded"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Enter symptoms"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Short Term Goals</label>
                        <textarea
                            className="textAreaRounded"
                            value={shortTermGoal}
                            onChange={(e) => setShortTermGoal(e.target.value)}
                            placeholder="Enter short term goals"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Long Term Goals</label>
                        <textarea
                            className="textAreaRounded"
                            value={longTermGoal}
                            onChange={(e) => setLongTermGoal(e.target.value)}
                            placeholder="Enter long term goals"
                        />
                    </div>

                    <div className="mb4">
                        <label className="labelMb2">Treatment Plan</label>
                        <textarea
                            className="textAreaRounded"
                            rows={4}
                            value={treatmentPlan}
                            onChange={(e) => setTreatmentPlan(e.target.value)}
                            placeholder="Describe the treatment plan here..."
                        />
                    </div>
                </form>

                <div className="buttonBoxBottomLeft">
                    <button className="btn btn-primary" onClick={saveTreatmentPlan}>Save</button>
                    <button className="btn btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default TreatmentPlan;
