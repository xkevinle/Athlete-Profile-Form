import { Request, Response, NextFunction } from 'express';
import Profile from '../models/profile.model';

const profileController = {
  createProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      res.locals.profile = await Profile.create(req.body);
      return next();
    } catch (error) {
      console.log(`Error at profile.controller for createProfile" ${error}`);
    }
  },
  getProfiles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.profiles = await Profile.find({});
      return next();
    } catch (error) {
      console.log(`Error at profile.controller for getProfiles" ${error}`);
    }
  },
}

export default profileController;