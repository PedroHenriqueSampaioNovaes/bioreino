import { Lesson } from '../../models/LessonModel.js';

import { ApiError } from '../../utils/ApiError.js';

interface ILessonRequest {
  slug: string;
}

export class GetLessonBySlugService {
  static async execute({ slug }: ILessonRequest) {
    const lesson = await Lesson.findOne({ slug });

    if (!lesson) {
      throw new ApiError('Aula não encontrada!', 404);
    }

    return lesson;
  }
}
