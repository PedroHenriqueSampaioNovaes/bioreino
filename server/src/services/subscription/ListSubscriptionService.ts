import { Plan } from '../../models/PlanModel';

export class ListSubscriptionService {
  static async execute() {
    const subscriptions = await Plan.find();

    return subscriptions;
  }
}
