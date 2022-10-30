import express, { Request, Response, Router } from "express";
import profileController from "../controllers/profile.controller";

const profileRouter: Router = express.Router();

profileRouter.post(
  "/create",
  profileController.createProfile,
  (req: Request, res: Response) => res.status(200).json(res.locals.profile)
);

profileRouter.get(
  "/",
  profileController.getProfiles,
  (req: Request, res: Response) => res.status(200).json(res.locals.profiles)
);

profileRouter.put(
  "/:_id",
  profileController.updateProfile,
  (req: Request, res: Response) =>
    res.status(200).json(res.locals.updatedProfile)
);

profileRouter.delete(
  "/:_id",
  profileController.deleteProfile,
  (req: Request, res: Response) =>
    res.status(200).json(res.locals.deletedProfile)
);

export default profileRouter;
