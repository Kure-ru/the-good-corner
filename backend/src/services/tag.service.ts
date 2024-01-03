import { Tag } from "../entities/tag";

export function findTagById(id: number): Promise<Tag | null> {
  return Tag.findOne({
    relations: {
      ads: true,
    },
    where: { id: id },
  });
}
