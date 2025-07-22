import { useEffect, useState } from "react";

interface Props {
    isOpen: Boolean;
    onClose: () => void;
    simulationId: number | null;
}


const PatientIntroduction = ({isOpen, onClose, simulationId}: Props)=> {
    const [background,setBackGround] = useState("");

    


    useEffect(() => {

        const fetchPatientBackground = async() => {
            if (!simulationId) return;

            try {
                const res = await fetch("/api/getPatientInformation?simulation",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        simulation_id: simulationId,
                    }),
                });

                const result = await res.json();

                if (res.ok) {
                    console.log("RESULT: ", result.patient[0].background);
                    setBackGround(result.patient[0].background);
                } else {
                    console.error("Error: ", result.message);
                }
            } catch (error) {
                console.error("Something went wrong: ", error)
            }
        };
        fetchPatientBackground();

        

    },[simulationId])


    if (!isOpen) return null;

    return (

        <div>

            <h2 className="text-lg font-bold">Patient Introduction</h2>
            
            <div>
                <p>{background}</p>
            </div>

            <button
                className="btn btn-primary translate-y-87"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default PatientIntroduction;