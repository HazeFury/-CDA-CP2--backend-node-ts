import db from "./db";
import { Country } from "./entities/country";
import { Continent } from "./entities/continent";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const europe = Continent.create({ name: "Europe", code: "EU" });

  const france = Country.create({
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
  });
  const belgium = Country.create({
    code: "BE",
    name: "Belgique",
    emoji: "🇧🇪",
  });
  const andorra = Country.create({
    code: "AD",
    name: "Andorre",
    emoji: "🇦🇩",
  });

  france.continent = europe;
  belgium.continent = europe;
  andorra.continent = europe;

  await france.save();
  await belgium.save();
  await andorra.save();
}

main();
