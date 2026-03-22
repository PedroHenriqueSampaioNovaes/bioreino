import { Types } from 'mongoose';

import { ApiError } from '../../utils/ApiError.js';

import { Lesson } from '../../models/LessonModel.js';

interface IGetVideoInfoRequest {
  lessonId: string;
  isUserAuthenticated: boolean;
}

export class GetVideoInfoService {
  static async execute({
    lessonId,
    isUserAuthenticated,
  }: IGetVideoInfoRequest) {
    if (!Types.ObjectId.isValid(lessonId)) {
      throw new ApiError('ID da aula inválido.', 400);
    }

    const lesson = await Lesson.findById(lessonId).select(
      'video transcription',
    );

    if (!lesson) {
      throw new ApiError('Aula não encontrada.', 404);
    }

    if (!lesson.free && !isUserAuthenticated) {
      throw new ApiError('Acesso negado.', 401);
    }

    return {
      video: lesson.video,
      transcription: lesson.transcription,
    };
  }
}
