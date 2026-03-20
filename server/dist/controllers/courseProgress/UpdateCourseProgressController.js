import { z } from 'zod';
import { UpdateCourseProgressService } from '../../services/courseProgress/UpdateCourseProgressService.js';
export class UpdateCourseProgressController {
    static async handle(req, res, next) {
        try {
            const { user_id } = req;
            const bodyScheme = z.object({
                courseId: z.string({ required_error: 'O _id do curso é obrigatório.' }),
                lessonId: z.string({ required_error: 'O _id da aula é obrigatório.' }),
            });
            const bodyData = bodyScheme.parse({
                ...req.body,
                courseId: req.params.course_id,
            });
            await UpdateCourseProgressService.execute({
                ...bodyData,
                user_id,
            });
            res.end();
        }
        catch (error) {
            next(error);
        }
    }
}
