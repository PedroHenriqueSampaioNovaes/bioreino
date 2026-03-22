export interface ILesson {
  _id: string;
  description: string;
  video: string;
  transcription: string;
  title: string;
  courseId: string;
  slug: string;
  free: boolean;
}

export interface IListLessonGet {
  course_id?: string;
}
