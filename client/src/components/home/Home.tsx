'use client';

import styles from './home.module.css';
import classNames from 'classnames';

import Link from 'next/link';

import PlanetHome from '@/icons/PlanetHome';
import AraraDevs from '@/icons/AraraDevs';
import GithubLogo from '@/icons/Github';

import { ICourse } from '@/common/@types/course';
import { ISubscription } from '@/common/@types/subscription';

import CourseShowcase from './CourseShowcase';
import About from './About';
import Testimony from './Testimony';
import Footer from '../layout/Footer';
import Subscriptions from './Subscriptions';
import HomeHeader from './HomeHeader';

interface IHomeProps {
  courses: ICourse[];
  subscriptions: ISubscription[];
}

export default function Home({ courses, subscriptions }: IHomeProps) {
  return (
    <div className={styles.home}>
      <HomeHeader />

      <main>
        <section className={classNames(styles.introduction, 'container')}>
          <div>
            <h1 className={classNames(styles.title)}>
              Faça diversos cursos de biologia e se torne um expert na área!
            </h1>
            <p className={classNames(styles.paragraph)}>
              Ajudamos você a alcançar suas metas com conteúdos inéditos e
              professores qualificados! Faça cursos para todas as idades e de
              onde estiver!
            </p>
            <AraraDevs className={classNames(styles.developmentTeam)} />
          </div>

          <PlanetHome />
        </section>

        <section className="container">
          <div className={classNames(styles.downloadApp)}>
            <p>
              Prefere ver as aulas pelo smartphone? Sem problema! Nossos alunos
              têm acesso a nossa plataforma também pelos dispositivos móveis
            </p>
            <Link
              href="https://github.com/AraraDevs/bioreino-android"
              target="_blank"
              className={styles.github}
            >
              <GithubLogo />
            </Link>
          </div>
        </section>

        <section id="courses" className="bgGradientPrimary sectionSpacing">
          <div className="container">
            <h2 className="title">Veja nossos Cursos!</h2>
            <p className="subtitle">conheça brevemente sobre eles</p>

            <CourseShowcase courses={courses} />
          </div>
        </section>

        <section id="about" className="sectionSpacing">
          <h2 className="title titleDark">Conheça nossos planos</h2>
          <p className="subtitle subtitleDark">
            fique por dentro de tudo sobre os planos oferecidos
          </p>
          <About
            image="/assets/about-plans/scholar.jpg"
            alt="SCHOLAR - Uma adolescente segurando três apostilas entre os braços cruzados sobre a barriga"
            title="SCHOLAR"
            description="Não está com boas notas na escola ou precisa estudar para aquele
          vestibular complicado? Assine já o plano scholar! Neste plano, o aluno
          terá acesso a todos os cursos voltados para os estudos desde o ensino
          fundamental, até o médio. Ele contará com atividades e simulados para
          se preparar para o mundo acadêmico. Assine já e se mantenha antenado
          sobre o que acontece no mundo da biologia!"
          />

          <About
            image="/assets/about-plans/professional.jpg"
            alt="PROFESSIONAL - Profissional usando microscópio"
            title="PROFESSIONAL"
            description="Seja para aqueles que já trabalham na área ou desejam se
                especializar, o plano professional garante seu caminho no
                mercado de trabalho! Contamos com cursos avançados em diversas
                subáreas da biologia, como por exemplo a Biologia Forense! Venha
                já fazer parte da nossa turma e se torne um biólogo certificado!"
            invert={true}
          />

          <About
            image="/assets/about-plans/kids.jpg"
            alt="Crianças fazendo experimentos e encarando seu professor de química num laboratório"
            title="Aulas para crianças"
            description="Temos conteúdos para a criançada matar a curiosidade! Você terá
                acesso a todas as aulas destinadas aos pequeninos, independente
                do plano escolhido! Assine o BioReino para seu filho e veja-o
                desenvolver conhecimentos na área da biologia de uma forma
                criativa, divertida e eficiente!"
          />
        </section>

        <section id="testimonies" className="bgGradientPrimary sectionSpacing">
          <div className="container">
            <h2 className="title">Depoimentos</h2>
            <p className="subtitle">
              o que alguns de nossos alunos disseram de nossos cursos
            </p>
            <Testimony />
          </div>
        </section>

        <section id="subscribe" className="sectionSpacing">
          <div className="container">
            <h2 className="title titleDark">Inscreva-se</h2>
            <p className="subtitle subtitleDark">
              assine um plano e tenha acesso a todos os cursos do mesmo
            </p>
            <Subscriptions subscriptions={subscriptions} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
