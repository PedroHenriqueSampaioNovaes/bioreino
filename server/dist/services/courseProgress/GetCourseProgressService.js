import { CourseProgress } from '../../models/CourseProgressModel.js';
export class GetCourseProgressService {
    static async execute({ user_id }) {
        const progress = await CourseProgress.find({ userId: user_id });
        return progress;
    }
}
