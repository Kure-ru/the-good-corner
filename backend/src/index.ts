import "reflect-metadata";
import { dataSource } from "./config/db";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { CategoryResolver } from "./resolvers/category.resolver";
import { AdResolver } from "./resolvers/ad.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { verifyToken } from "./services/auth.service";

import * as dotenv from "dotenv";
import { getByEmail } from "./services/user.service";
import { TagResolver } from "./resolvers/tag.resolver";

const start = async () => {
  dotenv.config();
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CategoryResolver, AdResolver, UserResolver, TagResolver],
    validate: { forbidUnknownValues: false },
    authChecker: async ({ context }, roles) => {
      try {
        const payload: any = verifyToken(context.token);
        const userFromDB = await getByEmail(payload.email);
        context.user = userFromDB;

        if (roles.length >= 1) {
          return roles.includes(context.user.role) ? true : false;
        }
        return true;
      } catch (err) {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req?.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization;
          return { token: bearer };
        } catch (err) {
          console.log(err);
          return {};
        }
      }
    },
  });

  server.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

void start();
