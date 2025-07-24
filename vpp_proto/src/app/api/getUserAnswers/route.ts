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
            "SELECT * FROM user_patient_information_answers WHERE simulation_id = ? ORDER BY id DESC",
            [simulation_id]
        );

        return NextResponse.json({answers: rows});
    } catch (error) {
        console.error("[getUserAnswers error]", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
    
}