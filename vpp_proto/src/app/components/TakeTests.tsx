"use client"

import { useEffect, useState } from "react";

interface Props {
    isOpen: Boolean;
    onClose: () => void;
    simulationId: number | null;
    patientId: number | null;
}

interface TestResult {
    test_type: string;
    result: string;
}

const TakeTests = ({ isOpen, onClose, simulationId, patientId }: Props) => {

    const [testButtons, setTestButtons] = useState<TestResult[]>([]);



    useEffect(() => {
        const fetchTests = async () => {

            if (!patientId) return;

            try {
                const res = await fetch("/api/getTestResults", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        patient_id: patientId,
                    }),
                });

                const results = await res.json();

                if (res.ok) {
                    console.log("TEST RESULTS: ", results);
                    setTestButtons(results.test_results);
                } else {
                    console.error("Error: ", results.message);
                }
            } catch (error) {
                console.error("Something went wrong.", error);
            }
        }
        fetchTests();
    }, [patientId]);


    

    if (!isOpen) return null;
    return (

        <div>

            <h2 className="text-lg font-bold">Take Test</h2>


            <div className="flex col gap-2">
                {testButtons.map((test, index) => (
                    <button
                        key={index}
                        className="btn btn-primary"
                    >
                        {test.test_type}
                    </button>
                ))

                }
            </div>


            <button
                onClick={onClose}
                className="btn btn-primary translate-y-75"
            >
                Close
            </button>
        </div>
    );
};

export default TakeTests;