import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Continent, NewContinentInput } from "../entities/continent";
import { GraphQLError } from "graphql";

@Resolver(Continent)
export default class ContinentResolver {
  @Query(() => [Continent])
  async continents() {
    return Continent.find();
  }

  @Query(() => Continent)
  async getContinentByCode(@Arg("continentCode") code: string) {
    const continent = await Continent.findOne({
      where: { code },
    });
    if (!continent) throw new GraphQLError("not found");
    return continent;
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg("infos") infos: NewContinentInput
  ): Promise<Continent> {
    const continent = Continent.create();
    Object.assign(continent, infos);
    await continent.save();
    return continent;
  }
}
