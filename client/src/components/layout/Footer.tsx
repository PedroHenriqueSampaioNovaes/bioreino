import Link from 'next/link';

import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Bioreino © 2025 -{' '}
        <Link href="https://github.com/AraraDevs" target="_blank">
          AraraDevs
        </Link>{' '}
        - Projeto de faculdade para fins acadêmicos
      </p>
    </footer>
  );
}
