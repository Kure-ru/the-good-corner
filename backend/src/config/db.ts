import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "good_corner",
  password: "password",
  database: "goodcornerdb",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations",
});
