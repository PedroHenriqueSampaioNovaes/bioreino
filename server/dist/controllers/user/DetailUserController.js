import { DetailUserService } from '../../services/user/DetailUserService.js';
export class DetailUserController {
    static async handle(req, res) {
        const { user_id } = req;
        const user = await DetailUserService.execute(user_id);
        res.json(user);
    }
}
