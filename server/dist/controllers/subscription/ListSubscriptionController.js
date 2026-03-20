import { ListSubscriptionService } from '../../services/subscription/ListSubscriptionService.js';
export class ListSubscriptionController {
    static async handle(req, res, next) {
        try {
            const subscriptions = await ListSubscriptionService.execute();
            res.json(subscriptions);
        }
        catch (error) {
            next(error);
        }
    }
}
