import { Request, Response, NextFunction } from 'express';
import Profile from '../models/profile.model';

const profileController = {
  createProfile: async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.body.firstName || 
      !req.body.lastName || 
      !req.body.sports || 
      !req.body.gender ||
      !req.body.dob ||
      !req.body.interests ||
      !req.body.location ||
      !req.body.team
    ) {
      return next({
        log: 'profile.controller createProfile ERROR',
        message: 'Unable to fulfill request without all fields completed.'
      })
    }
    try {
      res.locals.profile = await Profile.create(req.body);
      return next();
    } catch (error) {
      return next({
        log: 'profile.controller createProfile ERROR',
        message: 'Error occurred in profile controller for createProfile. Check log for more details.'
      });
    }
  },
  getProfiles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.profiles = await Profile.find({});
      return next();
    } catch (error) {
      return next({
        log: 'profile.controller createProfile ERROR',
        message: 'Error occurred in profile controller for getProfiles. Check log for more details.'
      });
    }
  },
  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      res.locals.updatedProfile = await Profile.findOneAndUpdate({ _id }, req.body);
      return next();
    } catch (error) {
      return next({
        log: 'profile.controller updateProfile ERROR',
        message: 'Error occurred in profile controller for updateProfile. Check log for more details.'
      });
    }
  },
  deleteProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      res.locals.deletedProfile = await Profile.deleteOne({ _id });
      return next();
    } catch (error) {
      return next({
        log: 'profile.controller deleteProfile ERROR',
        message: 'Error occurred in profile controller for deleteProfile. Check log for more details.'
      });
    }
  },
}

export default profileController;
