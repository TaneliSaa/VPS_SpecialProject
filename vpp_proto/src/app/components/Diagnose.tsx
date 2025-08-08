import { useState } from "react";



interface Props {
    userId: number | null;
    simulationId: number | null;
    isOpen: Boolean;
    onClose: () => void;
    onSave: () => void;
}

const Diagnose = ({ userId, simulationId, isOpen, onClose, onSave }: Props) => {

    const [diagnosis, setDiagnosis] = useState("");

    const handleSubmit = async () => {
        const res = await fetch("/api/diagnosis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                simulation_id: simulationId,
                diagnosis: diagnosis
            })
        });

        if (res.ok) {
            alert("Diagnosis saved!");
            onSave();
        } else {
            alert("Something went wrong.");
            console.log(res);
        }
    };

    if (!isOpen) return null;

    return (
        <div>
            <h2 className="heading2">Diagnose</h2>
            <label className="labelNormal" />
            Enter your diagnosis:
            <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="diagnosisInput"
                placeholder="Type your diagnosis here..."
                name="diagnosis input"
            >
            </input>
            <div className="buttonBox">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
                <button
                    onClick={onClose}
                    className="btn btn-primary"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Diagnose;