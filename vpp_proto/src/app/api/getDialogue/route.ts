import db from "@/app/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        const {simualation_id} = await req.json();

        if (!simualation_id) {
            return NextResponse.json({error: "Simulation not found."}, {status: 400});
        }

        const [rows] = await db.query(
            "SELECT answer FROM dialogues WHERE simulation_id = ?",
            [simualation_id]
        );

        return NextResponse.json({dialogue: rows});
    } catch (error) {
        console.error("[getDialogue error]", error);
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
    
}