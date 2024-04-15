import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, NewCountryInput } from "./../entities/country";
// import { Continent, NewContinentInput } from "../entities/continent";
import { GraphQLError } from "graphql";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("countryCode") code: string) {
    const country = await Country.findOne({
      where: { code },
    });
    if (!country) throw new GraphQLError("not found");
    return country;
  }

  @Query(() => Country)
  async getCountriesByContinentCode(@Arg("continentCode") code: string) {
    const countries = await Country.find({
      relations: { continent: true },
      where: { code },
    });
    if (!countries) throw new GraphQLError("not found");
    return countries;
  }

  @Mutation(() => Country)
  async createCountry(@Arg("infos") infos: NewCountryInput): Promise<Country> {
    const country = Country.create();
    Object.assign(country, infos);
    await country.save();
    return country;
  }
}
