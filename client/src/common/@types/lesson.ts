export interface ILesson {
  _id: string;
  description: string;
  title: string;
  courseId: string;
  slug: string;
  free: boolean;
}

export interface ILessonVideoData {
  video: string;
  transcription: string;
}

export interface IListLessonGet {
  course_id?: string;
}

export interface ILessonGet {
  slug: string;
}
