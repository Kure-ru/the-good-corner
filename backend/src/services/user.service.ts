import { User } from "../entities/user";
import * as argon2 from "argon2";

export async function create(email: string, password: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.password = await argon2.hash(password);
  newUser.role = "USER";
  return newUser.save();
}

export function getByEmail(email: string): Promise<User> {
  return User.findOneByOrFail({ email });
}
