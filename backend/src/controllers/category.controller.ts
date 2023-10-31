import express, { Request, Response } from "express";
import * as CategoryService from "../services/category.service";

const router = express.Router();

// GET /category all categories
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const startsWith = req.query.startsWith as string;
  const categories = await CategoryService.getCategories(startsWith);
  res.send(categories);
});

// GET/category/:id  a single category
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const category = await CategoryService.findCategoryById(id);
  res.send(category);
});

export default router;
