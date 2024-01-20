import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string));
        return verified;
    } catch (error) {
        throw new Error('Invalid token or expired token');
    }
}