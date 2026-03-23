'use client';

import styles from './dashboard.module.css';
import Image from 'next/image';

import { IoChevronForward } from 'react-icons/io5';

import Leopard from '@/icons/Leopard';
import ClapperboardClosed from '@/icons/ClapperboardClosed';

import { useUser } from '@/context/UserContext';

import BioreinoLogoLink from '../layout/BioreinoLogoLink';
import logout from '@/action/logout';
import Link from 'next/link';

import { ICourse } from '@/common/@types/course';
import { IUserCourseProgress } from '@/common/@types/user-course-progress';
import { ISubscription } from '@/common/@types/subscription';
import { ICategory } from '@/common/@types/category';

import Footer from '../layout/Footer';
import Title from './Title';
import MyCourses from './MyCourses';

interface IDashboardProps {
  courses: ICourse[];
  courseProgress: IUserCourseProgress[];
  subscriptions: ISubscription[];
  categories: ICategory[];
}

export default function Dashboard({
  courses,
  courseProgress,
  subscriptions,
  categories,
}: IDashboardProps) {
  const { user, setUser } = useUser();

  async function userLogout() {
    setUser(null);
    await logout();
    window.location.href = '/login';
  }

  return (
    <div className="App">
      <header className="container">
        <nav className={styles.nav}>
          <BioreinoLogoLink />

          <p className={styles.name}>Olá, {user?.name.split(' ')[0]}!</p>
          <button
            className={styles.logout}
            aria-label="Sair da conta"
            onClick={userLogout}
          >
            Sair <IoChevronForward size={20} />
          </button>
        </nav>
      </header>

      <main className="container AppBody">
        <section>
          <Title aria-label="Último curso assistido">Último curso</Title>

          <div className={styles.container}>
            <Leopard className={styles.svgLeopard} />
            {user?.lastWatched ? (
              <div className={styles.cardLastCourse}>
                <Image
                  src={user?.lastWatched.course.image}
                  alt=""
                  width={966}
                  height={750}
                  priority
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
                <div className={styles.details}>
                  <h2 className={styles.courseTitle} tabIndex={0}>
                    {user?.lastWatched.course.title}
                  </h2>
                  <p
                    className={styles.instructor}
                    aria-label={`Instrutor do curso: ${user?.lastWatched.course.professor}`}
                  >
                    Prof: {user?.lastWatched.course.professor}
                  </p>
                  <hr className={styles.divisor} />
                  <h1
                    className={styles.continue}
                    tabIndex={0}
                    aria-label="Continuar da aula que assistiu por último"
                  >
                    Continuar de onde parou:
                  </h1>
                  <Link
                    href={`/curso/${user?.lastWatched.course.slug}/${user?.lastWatched.lesson.slug}`}
                    className={styles.lesson}
                  >
                    <ClapperboardClosed />
                    <h3
                      className={styles.lessonTitle}
                      title={user?.lastWatched.lesson.title}
                    >
                      {user?.lastWatched.lesson.title}
                    </h3>
                    <p
                      className={styles.lessonDescription}
                      title={user?.lastWatched.lesson.description}
                    >
                      {user?.lastWatched.lesson.description}
                    </p>
                  </Link>
                </div>
              </div>
            ) : (
              <p className={styles.info} tabIndex={0}>
                Quando um curso for iniciado, aparecerá aqui. Tenha um ótimo
                estudo!
              </p>
            )}
          </div>
        </section>

        <MyCourses
          courses={courses}
          courseProgress={courseProgress}
          subscriptions={subscriptions}
          categories={categories}
        />
      </main>

      <Footer />
    </div>
  );
}
