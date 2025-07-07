import { NextResponse} from "next/server"
import jwt from "jsonwebtoken";
import db from "@/app/lib/db";

export async function POST(req: Request) {

    try {
        const {username,password} = await req.json();

        if (!password || !username) {
            return NextResponse.json({message: "Missing username or password!"}, {status: 400});
        }

        
        const [rows]: any = await db.execute("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return NextResponse.json({message: "Invalid username"}, {status: 401})
        }

        const user = rows[0];

        const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET as string);

        const response = NextResponse.json({message: "Login succesful!"});
        response.headers.set(
            "Set-cookie",
            `token=${token}; path=/; HttpOnly; Secure; Max-Age=3600`
        );

        return response;

    } catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}