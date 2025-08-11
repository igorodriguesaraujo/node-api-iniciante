import bcrypt from "bcryptjs";

export async function generateHash(password: string) {
  const salt = 12;
  return bcrypt.hashSync(password, salt);
}

export async function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}