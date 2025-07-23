"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import { useState } from "react";
import { resolve } from "path";

export default function Page() {

    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSimulationSelect = async (patientId: number, category: string) => {

        setLoading(true);


        try {

            const simulationStart = await fetch("/api/simulationStart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user?.id,
                    category: category,
                }),
            });

            const simulationData = await simulationStart.json();
            const simulationIdData = simulationData.simulation_id;


            if (!simulationData) {
                console.error("Failed to create simulation.", simulationData);
                return;
            }



            const patientGeneration = await fetch("/api/virtualPatient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    simulation_id: simulationIdData,
                }),
            });

            const patientData = await patientGeneration.json();

            if (!patientData) {
                console.error("Failed to create patient.")
                return;
            }

            const testGeneration = await fetch("/api/generateTest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    simulation_id: simulationIdData,
                }),
            });

            const testData = await testGeneration.json();
            console.log("TEST DATA: ", testData);

            if (!testData) {
                console.log("Failed to create tests.");
                return;
            }

            const PatientInformation = await fetch("/api/getPatientInformation", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    simulation_id: simulationIdData,
                }),
            });

            const patientInformationData = await PatientInformation.json();
            console.log("PATIENT INFORMATION DATA: ", patientInformationData)
            const patientDatabaseId = patientInformationData.patient[0].id;

            router.push(`/simulation?patientId=${patientId}&simulationId=${simulationIdData}&patientDatabaseId=${patientDatabaseId}`);

        } finally {
            setLoading(false);
        }


    };

    return (


        <div>
            <div className="simulationSelectionButtonPlacement">

                <div className="simulationSelectionButtonBox">

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(1, "cardiovascular")}
                    >Cardiovascular Simulation</button>

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(2, "neurological")}
                    >Neurological Simulation</button>

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(3, "common")}
                    >Common Simulation</button>

                </div>
            </div>
        </div>



    )
}