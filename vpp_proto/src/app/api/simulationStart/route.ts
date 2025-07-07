import { error } from "console";
import { NextResponse } from "next/server";
import db from "@/app/lib/db"


export async function POST(req: Request) {

    const {user_id} = await req.json();


    if (!user_id) {
        return NextResponse.json({error: "Missing user!"}, {status:400});
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result]: any = await db.query(
        "INSERT INTO simulations (user_id, created_at) VALUES (?, ?)",
        [user_id, timestamp]
    );


    const simulation_id = result.insertId;

    return NextResponse.json({simulation_id});
}