import { DeleteResult, Like } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";

export function findAdById(id: number): Promise<Ad | null> {
  return Ad.findOne({
    relations: {
      category: true,
    },
    where: { id: id },
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

export async function create(adsData: {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  categoryId: number;
}): Promise<Ad> {
  const ad = new Ad();
  Object.assign(ad, adsData);
  ad.createdAt = new Date();
  const category = await Category.findOneBy({ id: adsData.categoryId });

  ad.category = {
    id: adsData.categoryId,
  } as Category;

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
    adToupdate.owner = ad.owner;
    adToupdate.price = ad.price;
    adToupdate.picture = ad.picture;
    adToupdate.location = ad.location;

    const category = await Category.findOneBy({ id: categoryId });
    if (category) {
      adToupdate.category = category;
    }
    return adToupdate.save();
  }
}

export function deleteAd(id: number): Promise<DeleteResult> {
  return Ad.delete({ id: id });
}
