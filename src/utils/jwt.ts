import 'dotenv/config'
import { sign, SignOptions, verify } from "jsonwebtoken"

export async function generateToken(payload: any) {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'], // 7 Dias
  }

  return sign(
    { payload },
    process.env.JWT_SECRET_KEY!,
    options
  )
}

export function verifyToken(token: string) {
  return verify(token, process.env.JWT_SECRET_KEY!)
}