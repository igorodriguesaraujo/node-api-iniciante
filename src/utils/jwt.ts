import 'dotenv/config'
import { sign } from "jsonwebtoken"

export async function generateToken(payload: any) {
  return sign(
    payload,
    process.env.JWT_SECRET_KEY!,
  )
}

export function verifyToken(token: string) {
  const payload = JSON.parse(token)
  return payload
}