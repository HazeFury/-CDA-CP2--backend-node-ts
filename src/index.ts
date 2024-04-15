import "reflect-metadata";
import express, { Request, Response } from "express";

import db from "./db";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { Country } from "./entities/country";
import CountryResolver from "./resolvers/countryResolver";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// ------------------------  ROUTES  -----------------------------------------

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/countries", async (req: Request, res: Response) => {
  try {
    const countries = await Country.find();
    res.send(countries);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// ----------------------- INITIALIZATION  -----------------------------------

app.listen(port, async () => {
  await db.initialize();
  console.log(`Server running on http://localhost:${port}`);
});

buildSchema({
  resolvers: [CountryResolver],
}).then((schema) => {
  const server = new ApolloServer({ schema });
  startStandaloneServer(server, {
    listen: { port: 4001 },
  }).then(({ url }) => console.log(`graphql server listening on ${url}`));
});
