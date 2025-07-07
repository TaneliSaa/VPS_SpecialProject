"use client"

import patient1 from "@/app/assets/Patient1.jpg";
import patient2 from "@/app/assets/Patient2.jpg";
import patient3 from "@/app/assets/Patient3.jpg";
import Image, { StaticImageData } from "next/image";
import PatientInformation from "../components/PatientInformation";
import PatientIntroduction from "../components/PatientIntroduction";
import ActivityLog from "../components/ActivityLog";
import { useState } from "react";
import TakeTests from "../components/TakeTests";
import Diagnose from "../components/Diagnose";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Page() {

    const [isPatientInformationOpen, setIsPatientInformationOpen] = useState(false);
    const [isPatientIntroductionOpen, setIsPatientIntroductionOpen] = useState(false);
    const [isTakeTestOpen, setIsTakeTestOpen] = useState(false);
    const [isDiagnoseOpen, setIsDiagnoseOpen] = useState(false);
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
                            isOpen={isDiagnoseOpen}
                            onClose={() => setIsDiagnoseOpen(false)}
                        />


                    </div>

                    <div className="h-2/4 border border-black-400 p-4">

                        <ActivityLog />
                        
                        
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

                        <textarea
                            className="w-[550px] h-[200px] border border-gray-400 rounded p-2 resize-none translate-x-40"
                            value="Patient responses area"
                            readOnly
                        />

                        <input
                            className="w-[550px] h-[50px] border border-gray-400 rounded p-2 resize-none translate-x-40"
                            placeholder="Your questions here"
                        />
                        <button className="btn btn-primary translate-x-42">Submit</button>


                    </div>
                </div>
            </div>
        </div>


    )
}