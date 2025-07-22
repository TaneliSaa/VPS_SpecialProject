import db from "@/app/lib/db";
import { error } from "console";
import Groq from "groq-sdk";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

interface PatientRow extends RowDataPacket {
    name: string;
    sex: string;
    age: number;
    medical_history: string;
    current_medication: string;
    symptoms: string;
    lifestyle: string;
    background: string;
    simulation_id: number;
    personality: string;
}


export async function POST(req: Request) {

    try {

        const { simulation_id, prompt } = await req.json();

        if (!simulation_id || !prompt) {
            return NextResponse.json({ error: "Missing simulation_id or prompt." }, { status: 400 });
        }

        const [rows] = await db.query<PatientRow[]>(
            "SELECT * FROM patients WHERE simulation_id = ?",
            [simulation_id]
        );

        if (!rows.length) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        const patient = rows[0];

        const systemPrompt = `
    
    You are roleplaying as a virtual patient named ${patient.name}, a${patient.age}-year old ${patient.sex}.
    
    Stay in character based on the following traits:
    - Personality: ${patient.personality}
    - Symptoms: ${patient.symptoms}

    Respond naturally to the user's questions like a real patient. Avoid medical terminology unless the user uses it.

    Answer this:`;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                {
                    role: "system",
                    content: systemPrompt.trim(),
                },
                {
                    role: "user",
                    content: `Please answer the following question as the patient and respond in this JSON format:
                    {
                        "question": "${prompt}",
                        "answer": "Your in-character response here"
                    }
                     Question: ${prompt}`
                },
            ],
        });

        const message = completion.choices[0].message.content;

        let conversation;

        try {
            const jsonMatch = message?.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No json object found in response");
            conversation = JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Failed to parse LLM response" }, { status: 500 });
        }

        await db.query(
            "INSERT INTO dialogues (simulation_id, question, answer) VALUES (?, ?, ?)",
            [
                simulation_id,
                conversation.question,
                conversation.answer
            ]
        );

        return NextResponse.json({ message: conversation });

    } catch (error) {
        console.error("[patientDialogue Error: ]", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }

}