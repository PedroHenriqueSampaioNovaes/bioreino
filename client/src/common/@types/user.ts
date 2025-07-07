export interface ILastWatched {
  course: {
    courseTitle: string;
    slug: string;
    professor: string;
    imageUrl: string;
  };
  lesson: {
    lessonTitle: string;
    lessonDescription: string;
    slug: string;
  };
  watchedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  plan: {
    _id: string;
    name: string;
    fullaccess: boolean;
  };
  lastWatched?: ILastWatched;
}
