import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { error } from "console";
import db from "@/app/lib/db";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {

        const { simulation_id } = await req.json();

        if (!simulation_id) {
            return NextResponse.json({ error: "Missing simualation_id" }, { status: 400 });
        }

        const [rows]: any = await db.query(
            "Select category, condition_name, personality FROM simulations WHERE id= ?",
            [simulation_id]
        );

        if (!rows.length) {
            return NextResponse.json({ error: "Simulation not found!" }, { status: 404 });
        }

        const { category, condition_name, personality } = rows[0];

        const patientPrompt = `
        Create a realistic patient profile for a virtual patient simulation.

        - The patient has a medical condition related to: "${condition_name}".
        - The simulation category is: "${category}".
        - The patient has the following personality traits: "${personality}".

        Only provide a short and realistic introduction without giving clues or mentioning the diagnosis.

        Respond with structured data in this format:

        {
            "name": "...",
            "sex": "...",
            "age": "...",
            "age": "...",
            "medical_history": "...",
            "current_medication": "...",
            "symptoms": "...",
            "lifestyle": "...",
            "background": "...",
        }
        `;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                {
                    role: "system",
                    content: "You are a medical simulator AI that generates fictional but realistic patients."
                },
                {
                    role: "user",
                    content: patientPrompt,
                },
            ],
        });

        const message = completion.choices[0].message.content;


        let profile;
        try {
            const jsonMatch = message?.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON object found in response");
            profile = JSON.parse(jsonMatch[0]);
        } catch (error) {
            return NextResponse.json({ error: "Failed to parse LLM response", message }, { status: 500 });
        }

        await db.query(
            `INSERT INTO patients (name, sex, age, medical_history, current_medication, symptoms, lifestyle, background, simulation_id, personality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                profile.name,
                profile.sex,
                profile.age,
                profile.medical_history,
                profile.current_medication,
                profile.symptoms,
                profile.lifestyle,
                profile.background,
                simulation_id,
                personality
            ]
        );

        return NextResponse.json({ message });

    } catch (error) {
        console.error("[Groq API Error]", error)
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}