import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {

    try {
        const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

        if (!token) {
            return NextResponse.json({message: "Not authenticated!"}, {status: 401});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.json({ user: decoded});
    } catch (error) {
        return NextResponse.json({message: "Invalid token."}, {status: 401});
    }
}