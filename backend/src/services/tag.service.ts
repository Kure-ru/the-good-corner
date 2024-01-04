import { Tag } from "../entities/tag";

export function findTagById(id: number): Promise<Tag | null> {
  return Tag.findOne({
    relations: {
      ads: true,
    },
    where: { id: id },
  });
}

export async function create(tagName: string): Promise<Tag> {
  const existingTag = await Tag.findOne({ where: { name: tagName } });
  if (existingTag) {
    throw new Error("Tag already exists");
  }
  const tag = new Tag();
  tag.name = tagName;
  return tag.save();
}
