import express, { Request, Response } from "express";
import * as AdService from "../services/ad.service";

const router = express.Router();

// GET /ads ***** all ads
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const categoryId: number = parseInt(req.query.categoryId as string);
  const tagId = req.query.tagId
    ? parseInt(req.query.tagId as string)
    : undefined;
  const startsWith: string = req.query.startsWith as string;
  const ads = await AdService.search(categoryId, tagId, startsWith);
  console.log(ads);
  res.send(ads);
});

// GET /ads/:id a single ad
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  const ad = await AdService.findAdById(id);
  res.send(ad);
});

// POST/ads ****** Post a new ad
router.post("/", async (req: Request, res: Response): Promise<void> => {
  await AdService.create({ ...req.body });
  res.send("OK!");
});

// PUT /ad/:id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);

  try {
    const ad = await AdService.update(id, { ...req.body }, req.body.categoryId);
    res.send(ad);
  } catch (err) {
    res.sendStatus(404);
  }
});

// DELETE/ad/:id
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  await AdService.deleteAd(id);
  res.send("L'annonce a bien été supprimée");
});

export default router;
