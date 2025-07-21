import db from "@/app/lib/db";
import { error } from "console";
import Groq from "groq-sdk";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface patientId extends RowDataPacket {
    id: number
}


export async function POST(req: Request) {

    try {
        const { simulation_id } = await req.json();
        const [patientRows] = await db.query<patientId[]>("SELECT id FROM patients WHERE simulation_id = ?",
            [simulation_id]
        );

        if (!patientRows || patientRows.length === 0) {
            return NextResponse.json({error: "No patient ID found!"}, {status: 400});
        }
        
        const patientId = patientRows[0].id;

        if (!simulation_id) {
            return NextResponse.json({ error: "Missing simulation id." }, { status: 400 });
        }

        const [rows]: any = await db.query(
            "SELECT condition_name FROM simulations WHERE id = ? ",
            [simulation_id]
        );

        if (!rows.length) {
            return NextResponse.json({ error: "Simulation not found" }, { status: 404 });
        }

        const condition = rows[0].condition_name;

        const prompt = `
        Generate realistic diagnostic test results for a patient with the following condition: "${condition}"

        Only respond with a JSON array in this format - do not include any explanations:

        [
            {
                "test_type": "Blood test",
                "result": "Elevated white blood cells, CRP 65mg/L"
        
            },
            {
                "test_type": "Chext X-ray",
                "result": "No infiltrates or effusions"
            }
        ]

        Only return valid JSON.`;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                {
                    role: "system",
                    content: "You are a medical assistnat generating diagnostic test results for virtual patients."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const message = completion.choices[0].message.content;
        console.log("LLM raw response:", message);
        let tests;

        try {
            tests = JSON.parse(message || "");
            if (!Array.isArray(tests)) throw new Error("Parsed result in not an array");

        } catch (error) {
            return NextResponse.json({error: "Failed to parse test results", message}, {status: 500});
        }

        for (const test of tests) {
            await db.query(
                "INSERT INTO test_results (patient_id, test_type, result) VALUES (?, ?, ?)",
                [patientId, test.test_type, test.result]
            )
        }

        return NextResponse.json({tests})

    } catch (error) {
        console.error("[API Error]", error);
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }

}