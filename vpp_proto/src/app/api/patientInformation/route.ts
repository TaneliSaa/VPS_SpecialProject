import { NextResponse } from "next/server";
import db from '@/app/lib/db';

export async function GET(req: Request) {

    const { searchParams} = new URL(req.url);
    const patientId = searchParams.get('id');

    try {
        const [rows] = await db.execute('SELECT * from patients WHERE id = ?', [patientId]);

        return NextResponse.json({ data: rows});
    } catch (error) {
        return NextResponse.json({message: "Data not found."}, {status: 401});
    }

}