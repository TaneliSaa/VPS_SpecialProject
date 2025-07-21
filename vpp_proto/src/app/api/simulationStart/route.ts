import { NextResponse } from "next/server";
import db from "@/app/lib/db"
import { error } from "console";
import { RowDataPacket } from "mysql2";


function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

interface CategoryRow extends RowDataPacket {
    id: number;
};

interface ConditionRow extends RowDataPacket{
    name: string;
};

interface PersonalityRow extends RowDataPacket {
    description: string;
};



export async function POST(req: Request) {

    const {user_id, category} = await req.json();


    if (!user_id || !category) {
        return NextResponse.json({error: "Missing user or category!"}, {status:400});
    }

    const [categoryRows] = await db.query<CategoryRow[]>(
        "SELECT id FROM simulation_categories WHERE name = ?",
        [category]
    );

    if (!categoryRows) {
        return NextResponse.json({error: "Invalid category!"}, {status: 400});
    }

    const categoryRow = categoryRows[0];

    const categoryId = categoryRow.id;

    const [conditions] = await db.query<ConditionRow[]>(
        "SELECT name FROM conditions WHERE category_id = ?",
        [categoryId]
    );

    if (!conditions.length) {
        return NextResponse.json({error: "No conditions found for this category."}, {status: 500});
    }

    const condition = getRandomItem(conditions.map((row: any) => row.name));

    const [personalities] = await db.query<PersonalityRow[]>(
        "SELECT description FROM personalities"
    );

    if (!personalities.length) {
        return NextResponse.json({error: "No personalities found."}, {status: 500});
    }

    const personality = getRandomItem(personalities.map((row: any) => row.description));

    const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result]: any = await db.query(
        "INSERT INTO simulations (user_id, created_at, category, condition_name, personality) VALUES (?, ?, ?, ?, ?)",
        [user_id, timestamp, category, condition, personality]
    );


    const simulation_id = result.insertId;

    return NextResponse.json({simulation_id, category, condition, personality});
}