import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./good_corner.sqlite", // Chemin defini par rapport au package
  entities: ["src/entities/*.ts"],
  synchronize: true,
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations",
});
