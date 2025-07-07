import { NextResponse } from "next/server";
import db from "@/app/lib/db";



export async function POST(req: Request) {
    try {
        const {user_id, type, message, timestamp, simulation_id} = await req.json();

        if (!user_id || !type || !message || !timestamp || !simulation_id) {
            return  NextResponse.json({message: "Missing required fields!" + user_id + type + message + timestamp + simulation_id}, {status: 400});
        }

        await db.execute(
            "INSERT INTO activity_logs (user_id, type, message, timestamp, simulation_id) VALUES (?, ?, ?, ?, ?)",
            [user_id, type, message, timestamp, simulation_id]
        );
        return NextResponse.json({message: "Log entry saved."}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Server error."}, {status: 500});
    }
}