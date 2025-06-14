'use client';

import Image from 'next/image';
import classNames from 'classnames';

import styles from './testimony.module.css';

export default function Testimony() {
  return (
    <div className={classNames(styles.testimonies)}>
      <blockquote className={classNames(styles.testimony)}>
        <Image
          src="/assets/testimonies/cecilia.png"
          width={80}
          height={80}
          alt="Foto do aluno que fez o depoimento"
        />
        <cite>Cecília Carvalho</cite>
        <hr />
        <p>
          Meus filhos adoraram! O que antes era uma matéria complicada, com esta
          plataforma se tornou algo divertido e prazeroso de aprender 😊
        </p>
      </blockquote>
      <blockquote className={classNames(styles.testimony)}>
        <Image
          src="/assets/testimonies/mark.png"
          width={80}
          height={80}
          alt="Foto do aluno que fez o depoimento"
        />
        <cite>Mark Zuckerberg</cite>
        <hr />
        <p>
          Paguei pelo plano professional e não me arrependo. Desenvolvi diversos
          conhecimentos fantásticos sobre a natureza.
        </p>
      </blockquote>
      <blockquote className={classNames(styles.testimony)}>
        <Image
          src="/assets/testimonies/gustavo.png"
          width={80}
          height={80}
          alt="Foto do aluno que fez o depoimento"
        />
        <cite>Gustavo Souza</cite>
        <hr />
        <p>
          Impressionante a qualidade dos cursos que oferecem. Aulas com uma
          excelente didática e atualizadas. Aprovo e recomendo!
        </p>
      </blockquote>
    </div>
  );
}
