import Dispute from "./dispute.model.js";

export const createDispute = (data) => Dispute.create(data);
export const getAllDisputes = () => Dispute.find().populate("job");
