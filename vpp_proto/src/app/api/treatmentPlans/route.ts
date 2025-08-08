import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(req: Request) {



    try {

        const { patient_id, prescribed_medication, short_term_goals, long_term_goals, treatment_plan, simulation_id, diagnose } = await req.json();

        if (!simulation_id) {
            return NextResponse.json({ message: "Simulation not found." }, { status: 400 });
        }

        await db.query(
            "INSERT INTO treatment_plans (patient_id, prescribed_medication, short_term_goals, long_term_goals, treatment_plan, simulation_id, diagnose) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [patient_id, prescribed_medication, short_term_goals, long_term_goals, treatment_plan, simulation_id, diagnose]
        );
        return NextResponse.json({ message: "Treatment plan saved." }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}