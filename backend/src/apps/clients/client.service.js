import Client from "./client.model.js";

export const createClientProfile = (data) => Client.create(data);
export const getClientProfile = (userId) =>
  Client.findOne({ user: userId });
