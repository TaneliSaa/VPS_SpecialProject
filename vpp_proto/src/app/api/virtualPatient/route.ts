import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const prompt = body.prompt;

        const completion = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                {
                    role: "system",
                    content: "You are a virtual patient with a medical condition. Stay in character and response like a human patient would."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const message = completion.choices[0].message.content;
        return NextResponse.json({message});
    } catch (error) {
        console.error("[Groq API Error]", error)
        return NextResponse.json({error: "Something went wrong."}, {status: 500});
    }
}