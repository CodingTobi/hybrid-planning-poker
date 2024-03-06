import { cookies } from "next/headers";
import { NextRequest } from "next/server";

//sign out by deleting the token cookie
export async function POST(req: NextRequest) {
    cookies().delete('token')
    return new Response("ok", { status: 200 })
}