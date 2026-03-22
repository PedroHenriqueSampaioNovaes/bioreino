'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { ILesson, ILessonVideoData } from '@/common/@types/lesson';
import { ICourse } from '@/common/@types/course';
import { IUserCourseProgress } from '@/common/@types/user-course-progress';

type ILessonContext = {
  course: ICourse;
  courseProgress: IUserCourseProgress[] | null;
  lessons: ILesson[] | null;
  currentLesson: ILesson;
  setCurrentLesson: Dispatch<SetStateAction<ILesson>>;
  videoLessonInfo: ILessonVideoData | null;
};

const LessonContext = createContext<ILessonContext | null>(null);

export function useLesson() {
  const context = useContext(LessonContext);
  if (context === null) {
    throw new Error('useLesson must be used within a LessonContextProvider');
  }

  return context;
}

interface ILessonContextProviderProps {
  children: ReactNode;
  courseData: ICourse;
  courseProgressData: IUserCourseProgress[] | null;
  lessonsData: ILesson[];
  currentLessonData: ILesson;
  videoLessonInfo: ILessonVideoData | null;
}

export function LessonContextProvider({
  children,
  courseData,
  courseProgressData,
  lessonsData,
  currentLessonData,
  videoLessonInfo,
}: ILessonContextProviderProps) {
  const [currentLesson, setCurrentLesson] =
    useState<ILesson>(currentLessonData);

  return (
    <LessonContext
      value={{
        course: courseData,
        courseProgress: courseProgressData,
        lessons: lessonsData,
        currentLesson,
        setCurrentLesson,
        videoLessonInfo,
      }}
    >
      {children}
    </LessonContext>
  );
}
