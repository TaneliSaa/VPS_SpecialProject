"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {


    const router = useRouter();

    const handleSimulationSelect = (patientId: number) => {
        router.push(`/simulation?patientId=${patientId}`);
    };



    return (


        <div>
            <div className=" h-screen flex justify-center items-center bg-gray-100">

                <div className="flex flex-col items-center gap-4 border-2 border-dashed border-blue-500 p-8">

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(1)}
                    >Simulation 1</button>

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(2)}
                    >Simulation 2</button>

                    <button className="btn btn-primary"
                        onClick={() => handleSimulationSelect(3)}
                    >Simulation 3</button>

                </div>
            </div>
        </div>



    )
}