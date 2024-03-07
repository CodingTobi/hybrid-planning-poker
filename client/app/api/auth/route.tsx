import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Configuration Error! No secret or invalid secret. Please set JWT_SECRET in the .env file.');
    }
    return secret;
}

export async function POST(req: NextRequest) {
    // Get (possible) token from the request
    const token = req.cookies.get('token');
    const body = await req.json();
    console.log('body', body);

    try {
        if (token) { // token present, verify it
            const decoded = jwt.verify(token.value, getSecret());
            if (typeof decoded === 'string') {
                cookies().delete('token') // remove the token from the client
                throw new Error('Invalid token');
            }
            return new NextResponse(JSON.stringify({ success: true, userId: decoded.userId, roomId: decoded.roomId }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else { // no token present, create a new one
            const userId = nanoid();
            const newToken = jwt.sign({ userId: userId, roomId: body.roomId }, getSecret(), { expiresIn: '8h' });
            const response = new NextResponse(JSON.stringify({ success: true, userId:userId, roomId:body.roomId }), {
                status: 200, // OK
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `token=${newToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 8},`, // 8h
                },
            });
            return response;
        }
    } catch (error) {
        console.error(error);
        throw new Error("POST: Authentication failed");
    }
}

export async function GET(req: NextRequest) {
    console.debug("SRV:DBG - api/auth/GET");
    const token = req.cookies.get('token');
    // Verify the token
    try {
        if (!token) {
            throw new Error('No token');
        }
        const decoded = jwt.verify(token.value, getSecret());
        if (typeof decoded === 'string') {
            throw new Error(`Invalid token (${decoded})`);
        }
        return new NextResponse(JSON.stringify({ success: true, userId: decoded.userId, roomId: decoded.roomId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Token is not valid or expired
        console.error("API ERROR (GET): ", error);
        cookies().delete('token') // remove the token from the client
        return new NextResponse(JSON.stringify({ success: false, message: 'GET: Not logged in' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}