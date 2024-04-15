import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Continent } from "./continent";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  emoji: string;

  @ManyToOne(() => Continent, (continent) => continent.code, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @Field()
  continent: Continent;
}

@InputType()
export class NewCountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field()
  continent: string;
}
