import db from "@/app/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        const {patient_id} = await req.json();

        if (!patient_id) {
            return NextResponse.json({error: "Patient not found."}, {status: 400});
        }

        const [rows] = await db.query(
            "SELECT * FROM test_results WHERE patient_id = ?",
            [patient_id]
        );

        return NextResponse.json({test_results: rows});
    } catch (error) {
        console.error("[getTestResults error]", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
    
}