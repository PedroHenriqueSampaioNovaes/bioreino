import { ListCourseService } from '../../services/course/ListCourseService.js';
export class ListCourseController {
    static async handle(req, res, next) {
        try {
            const { limit, free, plan_id } = req.query;
            const courses = await ListCourseService.execute({
                limit: limit ? Number(limit) : undefined,
                free: free === 'true' ? true : free === 'false' ? false : undefined,
                planId: plan_id,
            });
            res.json(courses);
        }
        catch (error) {
            next(error);
        }
    }
}
