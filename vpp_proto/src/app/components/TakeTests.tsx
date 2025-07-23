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
    const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
    const [showTestResult, setShowTestResult] = useState(false);



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

    const openTestResults = (test: TestResult) => {
        setSelectedTest(test);
        setShowTestResult(true);
    }




    if (!isOpen) return null;
    return (

        <div>

            <h2 className="heading2">Take Test</h2>


            <div className="testButtonsBox">
                {testButtons.map((test, index) => (
                    <button
                        key={index}
                        className="btn btn-primary"
                        onClick={() => openTestResults(test)}
                    >
                        {test.test_type}
                    </button>
                ))

                }
            </div>

            <div className="buttonBox">

                <button
                    onClick={onClose}
                    className="btn btn-primary"
                >
                    Close
                </button>


            </div>

            {showTestResult && selectedTest && (
                <div className="testPopUpPlacement">
                    <div className="testPopUpStyle">
                        <h3 className="headings3">{selectedTest.test_type} Result</h3>
                        <p>{selectedTest.result}</p>
                        
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowTestResult(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeTests;