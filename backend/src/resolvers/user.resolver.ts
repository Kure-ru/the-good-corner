import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { User } from "../entities/user";
import * as UserService from "../services/user.service";
import * as AuthService from "../services/auth.service";
import { CustomContext } from "../types/CustomContext";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  @Authorized()
  getUser(@Ctx() ctx: CustomContext): Promise<User | null> {
    const userId = ctx.user.id;
    return UserService.getUser(userId);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("username") username: string
  ): Promise<User> {
    const userFromDB = await UserService.create(username, email, password);
    return userFromDB;
  }

  @Mutation(() => String)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      return AuthService.signIn(email, password);
    } catch (err) {
      throw new Error("Autorisation refusée.");
    }
  }
}
