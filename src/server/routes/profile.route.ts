import express, { Request, Response, Router } from "express";
import profileController from "../controllers/profile.controller";

const profileRouter: Router = express.Router();

profileRouter.post('/profile', profileController.createProfile, (req: Request, res: Response) => res.status(200).json(res.locals.profile));

profileRouter.get('/', profileController.getProfiles, (req: Request, res: Response) => res.status(200).json(res.locals.profiles));

export default profileRouter;