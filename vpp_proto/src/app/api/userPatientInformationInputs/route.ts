import { NextResponse } from "next/server";
import db from "@/app/lib/db";



export async function POST(req: Request) {
    try {
        const {user_id, simulation_id, name, sex, age, medical_history, current_medication, symptoms, lifestyle} = await req.json();

        if (!user_id || !simulation_id || !name || !sex || !age || !medical_history || !current_medication || !symptoms || !lifestyle) {
            return  NextResponse.json({message: "Missing required fields!" + user_id + simulation_id + name + sex + age + medical_history  + current_medication + symptoms + lifestyle}, {status: 400});
        }

        await db.execute(
            "INSERT INTO user_patient_information_answers (user_id, simulation_id, name, sex, age, medical_history, current_medication, symptoms, lifestyle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, simulation_id, name, sex, age, medical_history, current_medication, symptoms, lifestyle]
        );
        return NextResponse.json({message: "Log entry saved."}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Server error."}, {status: 500});
    }
}