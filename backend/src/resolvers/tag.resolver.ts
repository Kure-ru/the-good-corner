import { Arg, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/tag";
import * as TagService from "../services/tag.service";

@Resolver(Tag)
export class TagResolver {
  @Query(() => Tag, { nullable: true })
  async findTagById(@Arg("id") id: number): Promise<Tag | null> {
    return TagService.findTagById(id);
  }
}
