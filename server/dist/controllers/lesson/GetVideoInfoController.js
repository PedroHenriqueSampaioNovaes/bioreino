import { isAuthenticated } from '../../utils/isAuthenticated.js';
import { GetVideoInfoService } from '../../services/lesson/GetVideoInfoService.js';
export class GetVideoInfoController {
    static async handle(req, res, next) {
        try {
            const { lesson } = req.params;
            const isUserAuthenticated = isAuthenticated(req);
            const videoInfo = await GetVideoInfoService.execute({
                lessonId: lesson,
                isUserAuthenticated,
            });
            res.json(videoInfo);
        }
        catch (error) {
            next(error);
        }
    }
}
