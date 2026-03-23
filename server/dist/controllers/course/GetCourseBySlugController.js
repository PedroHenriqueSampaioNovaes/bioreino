import { GetCourseBySlugService } from '../../services/course/GetCourseBySlugService.js';
import { isAuthenticated } from '../../utils/isAuthenticated.js';
export class GetCourseBySlugController {
    static async handle(req, res, next) {
        try {
            const { slug } = req.params;
            if (!slug) {
                res.status(400).json({ error: 'Slug do curso é obrigatório' });
                return;
            }
            const isUserAuthenticated = isAuthenticated(req);
            const course = await GetCourseBySlugService.execute({
                slug,
                isUserAuthenticated,
            });
            res.json(course);
        }
        catch (error) {
            next(error);
        }
    }
}
