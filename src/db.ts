import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "checkpoint_db.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: true,
});
