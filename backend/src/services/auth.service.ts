import jwt from "jsonwebtoken";
import * as UserService from "./user.service";
import * as argon2 from "argon2";

export function verifyToken(token: string) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return verified;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await argon2.verify(hashedPassword, password);
}

function signJwt(payload: any) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60,
  });
}

export async function signIn(email: string, password: string) {
  try {
    const userFromDB = await UserService.getByEmail(email);

    if (await verifyPassword(password, userFromDB.password)) {
      const token = signJwt({
        email: userFromDB.email,
        role: userFromDB.role,
      });
      return token;
    } else {
      throw new Error();
    }
  } catch (err: any) {
    throw new Error(`Autorisation non valide.`);
  }
}
