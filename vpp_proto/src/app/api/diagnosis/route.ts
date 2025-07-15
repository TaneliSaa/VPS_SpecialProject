import { NextResponse } from "next/server";
import db from "@/app/lib/db";



export async function POST(req: Request) {
    try {
        const {user_id, simulation_id, diagnosis} = await req.json();

        if (!user_id || !simulation_id || !diagnosis) {
            return  NextResponse.json({message: "Missing required fields!" + user_id + simulation_id + diagnosis}, {status: 400});
        }

        await db.execute(
            "INSERT INTO diagnoses (user_id, simulation_id, diagnosis) VALUES (?, ?, ?)",
            [user_id, simulation_id, diagnosis]
        );
        return NextResponse.json({message: "Log entry saved."}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Server error."}, {status: 500});
    }
}
