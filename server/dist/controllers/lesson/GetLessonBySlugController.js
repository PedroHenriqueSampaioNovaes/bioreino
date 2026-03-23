import { GetLessonBySlugService } from '../../services/lesson/GetLessonBySlugService.js';
export class GetLessonBySlugController {
    static async handle(req, res, next) {
        try {
            const { slug } = req.params;
            if (!slug) {
                res.status(400).json({ error: 'Slug da aula é obrigatório' });
                return;
            }
            const lesson = await GetLessonBySlugService.execute({ slug });
            res.json(lesson);
        }
        catch (error) {
            next(error);
        }
    }
}
