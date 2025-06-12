'use client';

import { useEffect, useMemo, useState } from 'react';

import { ICourse, IProgress } from '@/common/@types/course';
import { ISubscription } from '@/common/@types/subscription';
import { ICategory } from '@/common/@types/category';

import { useUser } from '@/context/UserContext';

import ListCourse from './ListCourse';
import Title from './Title';
import Filter from './filter';

interface IMyCoursesProps {
  courses: ICourse[];
  courseProgress: IProgress[];
  subscriptions: ISubscription[];
  categories: ICategory[];
}

function filterCourses(
  courses: ICourse[],
  categories: ICategory[],
  filterCategory: string,
  filterPlan: string
) {
  const categoryId = categories.find(
    (category) => category.value === filterCategory
  )?._id;

  return courses.filter((course) => {
    const matchsPlan = !filterPlan || course.plan._id === filterPlan;
    const matchsCategory = !filterCategory || course.category === categoryId;

    return matchsPlan && matchsCategory;
  });
}

export default function MyCourses({
  subscriptions,
  categories,
  courses,
  courseProgress,
}: IMyCoursesProps) {
  const { user } = useUser();

  const [filterPlan, setFilterPlan] = useState(user?.plan._id || '');
  const [filterCategory, setFilterCategory] = useState('');

  const listCourse = useMemo(
    () => filterCourses(courses, categories, filterCategory, filterPlan),
    [courses, categories, filterCategory, filterPlan]
  );

  // Filters by categories related to the filtered plan
  const categoryOptions = useMemo(() => {
    return categories.filter((category) => {
      return category.plan === null || category.plan === filterPlan;
    });
  }, [categories, filterPlan]);

  useEffect(() => {
    // Clears the category whenever the plan changes
    setFilterCategory('');
  }, [filterPlan]);

  return (
    <section>
      <Title>Meus cursos</Title>

      <Filter
        user={user}
        categories={categoryOptions}
        subscriptions={subscriptions}
        setFilterPlan={setFilterPlan}
        setFilterCategory={setFilterCategory}
      />

      <ListCourse courses={listCourse} courseProgress={courseProgress} />
      {listCourse.length === 0 && (
        <p tabIndex={0}>Em breve teremos aulas para esta categoria...</p>
      )}
    </section>
  );
}
