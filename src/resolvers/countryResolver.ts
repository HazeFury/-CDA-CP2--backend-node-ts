import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, NewCountryInput } from "./../entities/country";
import { GraphQLError } from "graphql";

@Resolver(Country)
export default class AdsResolver {
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

  @Mutation(() => Country)
  async createCountry(@Arg("infos") infos: NewCountryInput): Promise<Country> {
    const country = Country.create();
    Object.assign(country, infos);
    await country.save();
    return country;
  }
}
