import { Course } from '../../models/CourseModel';

interface ICourseRequest {
  limit?: number;
  free?: boolean;
}

export class ListCourseService {
  static async execute({ limit, free }: ICourseRequest) {
    const optionalProperty = free ? { free } : {};
    const courses = await Course.find(optionalProperty).limit(limit ?? 0);

    return courses;
  }
}
