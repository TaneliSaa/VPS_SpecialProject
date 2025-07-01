import Link from "next/link";



export default function Page() {

    return (

        <div>

            <div className=" h-screen flex justify-center items-center bg-gray-100">

                <div className="flex flex-col items-center gap-4 border-2 border-dashed border-blue-500 p-8">

                    <Link href="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>

                    <Link href="/about">
                        <button className="btn btn-primary">About</button>
                    </Link>

                    <Link href="/credits">
                        <button className="btn btn-primary">Credits</button>
                    </Link>    
                </div>
            </div>
        </div>
    )
}