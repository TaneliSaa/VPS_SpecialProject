import { NextResponse} from "next/server"

export async function POST(req: Request) {

    try {
        const {username,password} = await req.json();

        if (!password || !username) {
            return NextResponse.json({message: "Missing username or password!"}, {status: 400});
        }

        const response = NextResponse.json({message: "Login succesful!"});

        return response;

    } catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}