import { NextResponse } from "next/server";
import db from "@/app/lib/db";


export async function POST(req: Request) {
    const {simulationId} = await req.json();

    if (!simulationId) {
        return NextResponse.json({message: "Missing simulation id."}, {status: 400});
    }

    const [rows]: any = await db.query(
        "SELECT * from activity_logs WHERE simulation_id = ? ORDER BY timestamp DESC",
        [simulationId]
    );

    return NextResponse.json({ logs: rows});
}
