import patient1 from "@/app/assets/Patient1.jpg";
import Image from "next/image";

export default function Page() {

    return (

        <div className="">
            <nav className="navbarSimulations">
                <button className="btn btn-primary">Patient introduction</button>
                <button className="btn btn-primary">Patient information</button>
                <button className="btn btn-primary">Take tests</button>
                <button className="btn btn-primary">Diagnose</button>
                <button className="btn btn-primary translate-x-220">End simulation</button>

            </nav>

            <div className="flex h-screen">

                <div className="w-2/4 border border-black-400 p-4">

                    <div className="h-2/4 border border-black-400 p-4">
                        USER ACTION AREA
                    </div>

                    <div className="h-2/4 border border-black-400 p-4">
                        
                        <button className="btn btn-primary translate-y-56">
                            Notes
                        </button>
                    </div>

                </div>

                <div className="w-2/4 border border-black-400 p-6">

                    <div className="flex justify-center h-2/4 border border-black-400 p-4">

                        <Image
                            src={patient1}
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