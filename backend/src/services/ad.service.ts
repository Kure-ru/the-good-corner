import { DeleteResult, Like } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";
import { validate } from "className-validator";

export function findAdById(id: number): Promise<Ad | null> {
  return Ad.findOne({
    relations: {
      category: true,
      tags: true,
    },
    where: { id: id },
  });
}

export function search(
  categoryId: number,
  tagId: number | undefined,
  startswith: string
): Promise<Ad[]> {
  if (categoryId || tagId) {
    console.log("hello");
    return Ad.find({
      relations: ["category", "tags"],
      where: {
        category: categoryId ? { id: categoryId } : undefined,
        tags: tagId ? { id: Number(tagId) } : undefined,
      },
    });
  } else {
    console.log("hello");
    return Ad.find({ relations: ["category", "tags"] });
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
  tags: string[];
}): Promise<Ad> {
  const ad = new Ad();
  const category = await Category.findOneBy({ id: adsData.categoryId });

  if (category) {
    ad.category = category;
  }

  if (adsData.tags && adsData.tags.length > 0) {
    const tagsEntities: Tag[] = [];
    for (const tagName of adsData.tags) {
      let tag = await Tag.findOneBy({ name: tagName });
      if (!tag) {
        tag = new Tag();
        tag.name = tagName;
      }

      tagsEntities.push(tag);
    }

    console.log(tagsEntities);
    ad.tags = tagsEntities;
  }

  return ad.save();
}

export async function update(
  id: number,
  ad: Ad,
  categoryId: number
): Promise<Ad | undefined> {
  const adToupdate = await findAdById(id);

  if (!adToupdate) {
    throw new Error("Ad not found");
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

    const errors = await validate(ad);
    console.log(errors);
    if (errors.length > 0) {
      throw new Error("Votre annonce n'a pas été validée");
    } else {
      return adToupdate.save();
    }
  }
}

export function deleteAd(id: number): Promise<DeleteResult> {
  return Ad.delete({ id: id });
}
