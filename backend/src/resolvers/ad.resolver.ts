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
  createAd(@Ctx() ctx: any, @Arg("ad") ad: CreateAdInputType): Promise<Ad> {
    const user = ctx.user;
    return AdService.create({ ...ad }, user);
  }

  @Mutation(() => Ad)
  @Authorized()
  updateAd(
    @Ctx() ctx: any,
    @Arg("ad") ad: UpdateAdInputType,
    @Arg("categoryId") categoryId: number
  ): Promise<Ad | undefined> {
    const user = ctx.user;
    if (!ad) {
      console.log("ad undefined");
      throw new Error("Ad undefined");
    }

    if (!user) {
      console.log("ctx.user undefined");
      throw new Error("User context undefined");
    }
    console.log(user);
    return AdService.update(ad.id, { ...ad } as Ad, categoryId);
  }
}
