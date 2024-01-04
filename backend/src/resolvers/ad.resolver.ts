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
import { CustomContext } from "../types/CustomContext";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  @Authorized()
  ads(
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
  @Authorized()
  async deleteAd(@Ctx() ctx: CustomContext, @Arg("id") id: number) {
    const userId = ctx.user.id;
    const userRole = ctx.user.role;

    if ((await AdService.isAuthorized(id, userId)) || userRole === "ADMIN") {
      await AdService.deleteAd(id);
    }
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
  async updateAd(
    @Ctx() ctx: CustomContext,
    @Arg("ad") ad: UpdateAdInputType,
    @Arg("categoryId") categoryId: number
  ): Promise<Ad | undefined> {
    const userId = ctx.user.id;
    const userRole = ctx.user.role;

    if ((await AdService.isAuthorized(ad.id, userId)) || userRole === "ADMIN") {
      return AdService.update(ad.id, { ...ad } as Ad, categoryId);
    } else {
      throw new Error("Accès refusé.");
    }
  }
}
