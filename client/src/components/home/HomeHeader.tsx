'use client';

import styles from './header.module.css';
import classNames from 'classnames';
import Link from 'next/link';

import useMedia from '@/hooks/useMedia';
import useScrollToElement from '@/hooks/useScrollToElement';
import useHighlightIndexWhenScroll from '@/hooks/useHighlightIndexWhenScroll';

import HeaderWithShadowOnScroll from '@/components/layout/HeaderWithShadowOnScroll';
import BioreinoLogoLink from '@/components/layout/BioreinoLogoLink';

export default function HomeHeader() {
  const isLargeDevice = useMedia('(min-width: 1024px)');

  const { scrollToId, onAction, setOnAction, allAnchorLinksRef } =
    useScrollToElement('header');

  useHighlightIndexWhenScroll(
    {
      listElementId: ['courses', 'about', 'testimonies'],
      scrollInUse: onAction,
      setScrollInUse: setOnAction,
    },
    'header'
  );

  return (
    <HeaderWithShadowOnScroll id="header" className={classNames(styles.header)}>
      <nav className={classNames(styles.nav, 'container')}>
        <BioreinoLogoLink />

        {isLargeDevice && (
          <ul className={styles.indexAnchorList}>
            <li>
              <a
                href="#courses"
                ref={(el) => {
                  allAnchorLinksRef.current[0] = el as HTMLAnchorElement;
                }}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(event.currentTarget);
                }}
              >
                Cursos
              </a>
            </li>
            <li>
              <a
                href="#about"
                ref={(el) => {
                  allAnchorLinksRef.current[1] = el as HTMLAnchorElement;
                }}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(event.currentTarget);
                }}
              >
                Sobre os planos
              </a>
            </li>
            <li>
              <a
                href="#testimonies"
                ref={(el) => {
                  allAnchorLinksRef.current[2] = el as HTMLAnchorElement;
                }}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(event.currentTarget);
                }}
              >
                Depoimentos
              </a>
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
            <a
              href="#subscribe"
              className={styles.callToAction}
              onClick={(event) => {
                event.preventDefault();
                scrollToId(event.currentTarget);
                event.currentTarget.blur();
              }}
            >
              Assinar
            </a>
          </li>
        </ul>
      </nav>
    </HeaderWithShadowOnScroll>
  );
}
