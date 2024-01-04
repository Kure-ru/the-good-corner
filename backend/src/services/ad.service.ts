import { DeleteResult, Like } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { User } from "../entities/user";

export async function isAuthorized(adId: any, userId: any) {
  const ad = await findAdById(adId);
  const adUserId = ad?.user.id;
  return adUserId === userId;
}

export function findAdById(
  id: number,
  tags: number[] = []
): Promise<Ad | null> {
  return Ad.findOne({
    relations: ["category", "tags", "user"],
    where: {
      id: id,
    },
  });
}

export function search(
  categoryId: number | undefined = undefined,
  search: string = ""
): Promise<Ad[]> {
  if (categoryId) {
    return Ad.find({
      relations: {
        category: true,
      },
      where: {
        category: {
          id: categoryId,
        },
        title: Like(`%${search}%`),
      },
    });
  } else {
    return Ad.find({
      relations: {
        category: true,
      },
      where: {
        title: Like(`%${search}%`),
      },
    });
  }
}

export async function create(
  adsData: CreateAdInputType,
  user: User
): Promise<Ad> {
  const ad = new Ad();
  Object.assign(ad, adsData);
  ad.createdAt = new Date();

  ad.category = {
    id: adsData.categoryId,
  } as Category;

  ad.user = user;

  return ad.save();
}

export async function update(
  id: number,
  ad: Ad,
  categoryId: number
): Promise<Ad | undefined> {
  const adToupdate = await findAdById(id);

  if (!adToupdate) {
    throw new Error("Ad not found 😭");
  }

  if (adToupdate) {
    adToupdate.title = ad.title;
    adToupdate.description = ad.description;
    adToupdate.price = ad.price;
    adToupdate.picture = ad.picture;
    adToupdate.location = ad.location;

    const category = await Category.findOneBy({ id: categoryId });
    if (category) {
      adToupdate.category = category;
    }

    console.log(adToupdate);
    return adToupdate.save();
  }
}

export function deleteAd(id: number): Promise<DeleteResult> {
  return Ad.delete({ id: id });
}
