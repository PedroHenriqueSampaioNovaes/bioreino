export interface IUserCourseProgress {
  _id: string;
  userId: string;
  courseId: string;
  completed: boolean;
  lastWatchedAt: string;
  lessons: {
    lessonId: string;
    watchedAt: string;
  }[];
  progress: number;
}
