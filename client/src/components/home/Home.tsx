'use client';

import styles from './home.module.css';
import classNames from 'classnames';

import Link from 'next/link';
import Image from 'next/image';

import BioreinoLogo from '@/icons/Bioreino';
import PlanetHome from '@/icons/PlanetHome';
import AraraDevs from '@/icons/AraraDevs';
import GithubLogo from '@/icons/Github';
import useMedia from '@/hooks/useMedia';

export default function Home() {
  const isLargeDevice = useMedia('(min-width: 1024px)');

  return (
    <div className={styles.home}>
      <header className={classNames(styles.header)}>
        <nav className={classNames(styles.nav, 'container')}>
          <Link
            href="/"
            aria-label="Bioreino - Home"
            className={classNames(styles.logo)}
          >
            <BioreinoLogo />
          </Link>

          {isLargeDevice && (
            <ul className={styles.index}>
              <li>
                <a href="#courses">Cursos</a>
              </li>
              <li>
                <a href="#about">Sobre os planos</a>
              </li>
              <li>
                <a href="#testimonies">Depoimentos</a>
              </li>
            </ul>
          )}

          <ul>
            <li>
              <Link href="/login" className={styles.login}>
                Entrar
              </Link>
            </li>
            <li>
              <a href="#subscribe" className={styles.callToAction}>
                Assinar
              </a>
            </li>
          </ul>
        </nav>
      </header>

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

        <section id="courses" className="bgGradientPrimary">
          <div className={classNames('sectionSpacing', 'container')}>
            <h2 className="title">Veja nossos Cursos!</h2>
            <p className="subtitle">conheça brevemente sobre eles</p>

            <ul className={classNames(styles.listCourse)}>
              <li className={classNames(styles.course)}>
                <a href="">
                  <span>nome-do-plano-de-assinatura</span>
                  <div>Imagem de fundo do curso</div>
                  <div>
                    <h3>nome-do-curso</h3>
                    <span>Prof. nome-do-professor</span>
                  </div>
                </a>
              </li>

              <li className={classNames(styles.course)}>
                <a href="">
                  <span>nome-do-plano-de-assinatura</span>
                  <div>Imagem de fundo do curso</div>
                  <div>
                    <h3>nome-do-curso</h3>
                    <span>Prof. nome-do-professor</span>
                  </div>
                </a>
              </li>

              <li className={classNames(styles.course)}>
                <a href="">
                  <span>nome-do-plano-de-assinatura</span>
                  <div>Imagem de fundo do curso</div>
                  <div>
                    <h3>nome-do-curso</h3>
                    <span>Prof. nome-do-professor</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="about">
          <h2 className="title">Conheça nossos planos</h2>
          <p className="subtitle">
            fique por dentro de tudo sobre os planos oferecidos
          </p>

          <div>
            <Image
              src="/assets/about-plans/scholar.jpg"
              width={700}
              height={551}
              priority
              alt="SCHOLAR - Uma adolescente segurando três apostilas entre os braços cruzados sobre a barriga"
            />

            <div>
              <h3>Plano SCHOLAR</h3>
              <p>
                Não está com boas notas na escola ou precisa estudar para aquele
                vestibular complicado? Assine já o plano scholar! Neste plano, o
                aluno terá acesso a todos os cursos voltados para os estudos
                desde o ensino fundamental, até o médio. Ele contará com
                atividades e simulados para se preparar para o mundo acadêmico.
                Assine já e se mantenha antenado sobre o que acontece no mundo
                da biologia!
              </p>
            </div>
          </div>

          <div>
            <Image
              src="/assets/about-plans/professional.jpg"
              width={700}
              height={551}
              alt="PROFESSIONAL - Profissional usando microscópio"
            />

            <div>
              <h3>Plano PROFESSIONAL</h3>
              <p>
                Seja para aqueles que já trabalham na área ou desejam se
                especializar, o plano professional garante seu caminho no
                mercado de trabalho! Contamos com cursos avançados em diversas
                subáreas da biologia, como por exemplo a Biologia Forense! Venha
                já fazer parte da nossa turma e se torne um biólogo certificado!
              </p>
            </div>
          </div>

          <div>
            <Image
              src="/assets/about-plans/kids.jpg"
              width={700}
              height={551}
              alt="Crianças fazendo experimentos e encarando seu professor de química num laboratório"
            />

            <div>
              <h3>Aulas para crianças</h3>
              <p>
                Temos conteúdos para a criançada matar a curiosidade! Você terá
                acesso a todas as aulas destinadas aos pequeninos, independente
                do plano escolhido! Assine o BioReino para seu filho e veja-o
                desenvolver conhecimentos na área da biologia de uma forma
                criativa, divertida e eficiente!
              </p>
            </div>
          </div>
        </section>

        <section id="testimonies">
          <h2 className="title">Depoimentos</h2>
          <p className="subtitle">
            o que alguns de nossos alunos disseram de nossos cursos
          </p>

          <div>
            <blockquote>
              <Image
                src="/assets/testimonies/cecilia.png"
                width={80}
                height={80}
                alt="Foto do aluno que fez o depoimento"
              />
              <cite>Cecília Carvalho</cite>
              <hr />
              <p>
                Meus filhos adoraram! O que antes era uma matéria complicada,
                com esta plataforma se tornou algo divertido e prazeroso de
                aprender 😊
              </p>
            </blockquote>

            <blockquote>
              <Image
                src="/assets/testimonies/mark.png"
                width={80}
                height={80}
                alt="Foto do aluno que fez o depoimento"
              />
              <cite>Mark Zuckerberg</cite>
              <hr />
              <p>
                Paguei pelo plano professional e não me arrependo. Desenvolvi
                diversos conhecimentos fantásticos sobre a natureza.
              </p>
            </blockquote>

            <blockquote>
              <Image
                src="/assets/testimonies/gustavo.png"
                width={80}
                height={80}
                alt="Foto do aluno que fez o depoimento"
              />
              <cite>Gustavo Souza</cite>
              <hr />
              <p>
                Impressionante a qualidade dos cursos que oferecem. Aulas com
                uma excelente didática e atualizadas. Aprovo e recomendo!
              </p>
            </blockquote>
          </div>
        </section>

        <section id="subscribe">
          <h2 className="title">Inscreva-se</h2>
          <p className="subtitle">
            assine um plano e tenha acesso a todos os cursos do mesmo
          </p>

          <div>
            <div>
              <h2>nome-do-plano-de-assinatura</h2>
              <ul>
                <li>
                  {/* <Checked /> */}
                  <p>benefício</p>
                </li>
              </ul>
              <p>R$ 300,00</p>
              <div>
                <Link href={`/assinar/${'nome-do-plano'}`}>Assine já!</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>
          Bioreino © 2023 -{' '}
          <Link href="https://github.com/AraraDevs" target="_blank">
            AraraDevs
          </Link>{' '}
          - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
