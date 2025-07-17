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
    const [simulationId,setSimulationId] = useState<number | null>(null);
    const {user} = useAuth();
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

    //Simulation start
    useEffect(() => {
        const startSimulation = async () => {
            const res = await fetch("/api/simulationStart", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: user?.id}),
            });
        
            const data = await res.json();
            console.log("SIMULATION DATA: ", data);
            setSimulationId(data.simulation_id);
            console.log("SIMULATION ID: ", simulationId);
            

            const startTime = new Date().toISOString();
        };

        if (user?.id) {
            startSimulation();
        }
    },[user])

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

                <button className="btn btn-primary translate-x-220"
                    onClick={() => endSimulation()}

                >End simulation</button>

            </nav>

            <div className="flex h-screen">

                <div className="w-2/4 border border-black-400 p-4">

                    <div className="h-2/4 border border-black-400 p-4">


                        <PatientInformation
                            patientId={patientId}
                            simulationId = {simulationId}
                            isOpen={isPatientInformationOpen}
                            onClose={() => setIsPatientInformationOpen(false)}
                        />

                        <PatientIntroduction
                            isOpen={isPatientIntroductionOpen}
                            onClose={() => setIsPatientIntroductionOpen(false)}
                        />

                        <TakeTests
                            isOpen={isTakeTestOpen}
                            onClose={() => setIsTakeTestOpen(false)}
                        />

                        <Diagnose
                        userId={user?.id}
                            simulationId={simulationId}
                            isOpen={isDiagnoseOpen}
                            onClose={() => setIsDiagnoseOpen(false)}
                        />


                    </div>

                    <div className="h-2/4 border border-black-400 p-4">

                        
                       { simulationId && (<ActivityLog 
                            simulationId={simulationId}

                        />)}
                            
                        
                    </div>

                </div>

                <div className="w-2/4 border border-black-400 p-6">

                    <div className="flex justify-center h-2/4 border border-black-400 p-4">

                        <Image
                            src={imageSrc}
                            alt="Patient"
                            height={550}
                            className="rounded border border-gray-400"

                        />

                    </div>

                    <div className="flex-c justify-center h-2/4 border border-black-400 p-4">

                        <PatientDialogue />


                    </div>
                </div>
            </div>
        </div>


    )
}