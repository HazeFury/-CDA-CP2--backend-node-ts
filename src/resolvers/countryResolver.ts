import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country, NewCountryInput } from "./../entities/country";

@Resolver(Country)
export default class AdsResolver {
  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Mutation(() => Country)
  async createCountry(@Arg("infos") infos: NewCountryInput): Promise<Country> {
    const country = Country.create();
    Object.assign(country, infos);
    await country.save();
    return country;
  }
}
