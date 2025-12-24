import * as ClientService from "./client.service.js";

export const createProfile = async (req, res, next) => {
  try {
    const profile = await ClientService.createClientProfile({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const profile = await ClientService.getClientProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};
