"use client"
import patient1 from "@/app/assets/Patient1.jpg";
import patient2 from "@/app/assets/Patient2.jpg";
import patient3 from "@/app/assets/Patient3.jpg";
import Image, { StaticImageData } from "next/image";
import PatientInformation from "../components/PatientInformation";
import PatientIntroduction from "../components/PatientIntroduction";
import ActivityLog from "../components/ActivityLog";
import { useEffect, useRef, useState } from "react";
import TakeTests from "../components/TakeTests";
import Diagnose from "../components/Diagnose";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import PatientDialogue from "../components/PatientDialogue";


export default function Page() {

    const [isPatientInformationOpen, setIsPatientInformationOpen] = useState(false);
    const [isPatientIntroductionOpen, setIsPatientIntroductionOpen] = useState(false);
    const [isTakeTestOpen, setIsTakeTestOpen] = useState(false);
    const [isDiagnoseOpen, setIsDiagnoseOpen] = useState(false);
    const [simulationId, setSimulationId] = useState<number | null>(null);
    const [patientIdDatabase, setPatientIdDatabase] = useState<number | null>(null);
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get('patientId');
    const patientImages: Record<string, StaticImageData> = {
        "1": patient1,
        "2": patient2,
        "3": patient3,
    }

    const nullFixPatientId = patientId ?? "";
    const imageSrc = patientImages[nullFixPatientId];


    const endSimulation = () => {
        router.push("/simulation_selection");
    }

    useEffect(() => {
        const simId = searchParams.get("simulationId");
        const patId = searchParams.get("patientDatabaseId");
        if (simId && patId) {
            setSimulationId(Number(simId));
            setPatientIdDatabase(Number(patId));
        }
    }, [searchParams])

    return (

        <div className="">
            <nav className="navbarSimulations">
                <button className="btn btn-primary"
                    onClick={() => {
                        setIsPatientIntroductionOpen(!isPatientIntroductionOpen)
                            ; setIsPatientInformationOpen(false)
                            ; setIsDiagnoseOpen(false)
                            ; setIsTakeTestOpen(false)
                    }}
                >Patient introduction</button>

                <button className="btn btn-primary"
                    onClick={() => {
                        setIsPatientInformationOpen(!isPatientInformationOpen)
                            ; setIsPatientIntroductionOpen(false)
                            ; setIsDiagnoseOpen(false)
                            ; setIsTakeTestOpen(false);
                    }}

                >Patient information</button>

                <button className="btn btn-primary"
                    onClick={() => {
                        setIsTakeTestOpen(!isTakeTestOpen)
                            ; setIsPatientIntroductionOpen(false)
                            ; setIsDiagnoseOpen(false)
                            ; setIsPatientInformationOpen(false);
                    }}

                >Take tests</button>

                <button className="btn btn-primary"
                    onClick={() => {
                        setIsDiagnoseOpen(!isDiagnoseOpen)
                            ; setIsPatientIntroductionOpen(false)
                            ; setIsPatientInformationOpen(false)
                            ; setIsTakeTestOpen(false);
                    }}

                >Diagnose</button>

                <button className="btn simulationEndButton"
                    onClick={() => endSimulation()}

                >End simulation</button>

            </nav>

            <div className="simulationPageMainDiv">

                <div className="simulationPageLeftHalf">

                    <div className="simulationPageTopLeftQuarter">


                        <PatientInformation
                            patientId={patientId}
                            simulationId={simulationId}
                            isOpen={isPatientInformationOpen}
                            onClose={() => setIsPatientInformationOpen(false)}
                        />

                        <PatientIntroduction
                            isOpen={isPatientIntroductionOpen}
                            onClose={() => setIsPatientIntroductionOpen(false)}
                            simulationId={simulationId}
                        />

                        <TakeTests
                            isOpen={isTakeTestOpen}
                            onClose={() => setIsTakeTestOpen(false)}
                            simulationId={simulationId}
                            patientId={patientIdDatabase}
                        />

                        <Diagnose
                            userId={user?.id}
                            simulationId={simulationId}
                            isOpen={isDiagnoseOpen}
                            onClose={() => setIsDiagnoseOpen(false)}
                        />


                    </div>

                    <div className="simulationPageBottomLeftQuarter">


                        {simulationId && (<ActivityLog
                            simulationId={simulationId}

                        />)}


                    </div>

                </div>

                <div className="simulationPageRightHalf">

                    <div className="simulationPageTopRightQuarter">

                        <Image
                            src={imageSrc}
                            alt="Patient"
                            height={550}
                            className="patientImage"

                        />

                    </div>

                    <div className="simulationPageBottomRightQuarter">

                        <PatientDialogue
                            simulationId={simulationId}
                        />
                    </div>
                </div>
            </div>
        </div>


    )
}