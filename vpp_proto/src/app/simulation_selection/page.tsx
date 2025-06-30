import Link from "next/link";

export default function Page() {
    return(


        <div>

            <div className=" h-screen flex justify-center items-center bg-gray-100">

                <div className="flex flex-col items-center gap-4 border-2 border-dashed border-blue-500 p-8">

                    <Link href="">
                        <button className="btn btn-primary">Simulation 1</button>
                    </Link>

                    <Link href="">
                        <button className="btn btn-primary">Simulation 2</button>
                    </Link>

                    <Link href="">
                        <button className="btn btn-primary">Simulation 3</button>
                    </Link>    
                </div>
            </div>
        </div>



    )
}