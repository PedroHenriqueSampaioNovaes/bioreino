import { Course } from '../../models/CourseModel';

import { ApiError } from '../../utils/ApiError';

interface ICourseRequest {
  slug: string;
}

export class GetCourseService {
  static async execute({ slug }: ICourseRequest) {
    const course = await Course.findOne({ slug }).populate('lessons');

    if (!course) {
      throw new ApiError('Curso não encontrado!', 404);
    }

    return course;
  }
}
