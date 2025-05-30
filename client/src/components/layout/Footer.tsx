import Link from 'next/link';

import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Bioreino © 2023 -{' '}
        <Link href="https://github.com/AraraDevs" target="_blank">
          AraraDevs
        </Link>{' '}
        - Todos os direitos reservados
      </p>
    </footer>
  );
}
