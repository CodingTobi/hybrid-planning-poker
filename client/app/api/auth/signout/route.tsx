import { cookies } from "next/headers";
import { NextRequest } from "next/server";

//sign out by deleting the token cookie
export async function DELETE(req: NextRequest) {
    console.log(cookies().delete('token'))
    return new Response("ok", { status: 200 })
}