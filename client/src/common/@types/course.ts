export interface IListCourseGet {
  limit?: number;
  hasLessonFree?: boolean;
  planId?: string;
}

export interface ICourseGet {
  slug: string;
}

export interface ICourse {
  _id: string;
  professor: string;
  image: string;
  category: string;
  title: string;
  lessons: number;
  updatedAt: string;
  slug: string;
  hasLessonFree: boolean;
  plan: { _id: string; name: string };
}

export interface IProgress {
  _id: string;
  userId: string;
  courseId: string;
  completed: boolean;
  createdAt: string;
  lastWatchedAt: string;
  lessons: {
    lessonId: string;
    watchedAt: string;
  }[];
  progress: number;
}
