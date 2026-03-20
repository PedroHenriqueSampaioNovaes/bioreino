import { Plan } from '../../models/PlanModel.js';

export class ListSubscriptionService {
  static async execute() {
    const subscriptions = await Plan.find();

    return subscriptions;
  }
}
