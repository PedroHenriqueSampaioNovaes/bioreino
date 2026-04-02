import Link from 'next/link';

import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        Bioreino © {currentYear} -{' '}
        <Link href="https://github.com/AraraDevs" target="_blank">
          AraraDevs
        </Link>{' '}
        - Projeto de faculdade para fins acadêmicos -{' '}
        <Link href="/creditos" target="_blank">
          créditos
        </Link>
      </p>
    </footer>
  );
}
