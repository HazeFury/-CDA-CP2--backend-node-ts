import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Country } from "./country";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}

@InputType()
export class NewContinentInput {
  @Field()
  name: string;

  @Field()
  code: string;
}
