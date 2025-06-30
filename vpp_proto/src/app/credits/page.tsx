import Link from "next/link";

export default function Page() {

    return (


        <div>
            <p>Credits page</p>

            <Link href="home">
                <button className="btn btn-primary">Back</button>
            </Link>

        </div>

    )
}