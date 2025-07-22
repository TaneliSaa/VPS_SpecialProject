import db from "@/app/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        const {simulation_id} = await req.json();

        if (!simulation_id) {
            return NextResponse.json({error: "Simulation not found."}, {status: 400});
        }

        const [rows] = await db.query(
            "SELECT * FROM patients WHERE simulation_id = ?",
            [simulation_id]
        );

        return NextResponse.json({patient: rows});
    } catch (error) {
        console.error("[getPatientInformation error]", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
    
}