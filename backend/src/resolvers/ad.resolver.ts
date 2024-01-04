import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import { Ad } from "../entities/ad";
import * as AdService from "../services/ad.service";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { UpdateAdInputType } from "../types/UpdateAdInput";
import { Context } from "apollo-server-core";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  @Authorized()
  ads(
    @Ctx() ctx: Context,
    @Arg("search", { nullable: true }) search: string,
    @Arg("categoryId", { nullable: true }) categoryId?: number
  ): Promise<Ad[]> {
    console.log(ctx);
    return AdService.search(categoryId, search);
  }

  @Query(() => Ad)
  getAd(
    @Arg("id") id: number,
    @Arg("tags", () => [Int], { nullable: true }) tags?: number[]
  ): Promise<Ad | null> {
    return AdService.findAdById(id, tags);
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    await AdService.deleteAd(id);
    return "Annonce supprimée.";
  }

  @Mutation(() => Ad)
  @Authorized()
  createAd(@Arg("ad") ad: CreateAdInputType): Promise<Ad> {
    return AdService.create({ ...ad });
  }

  @Mutation(() => Ad)
  updateAd(
    @Arg("ad") ad: UpdateAdInputType,
    @Arg("categoryId") categoryId: number,
    @Arg("tags", () => [Int]) tags: number[]
  ): Promise<Ad | undefined> {
    return AdService.update(ad.id, { ...ad } as Ad, categoryId, tags);
  }
}
