import { CourseProgress } from '../../models/CourseProgressModel';

interface ICourseProgressRequest {
  user_id: string;
}

export class GetCourseProgressService {
  static async execute({ user_id }: ICourseProgressRequest) {
    const progress = await CourseProgress.find({ userId: user_id });

    return progress;
  }
}
