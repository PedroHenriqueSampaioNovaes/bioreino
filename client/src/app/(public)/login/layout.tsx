import styles from './login.module.css';
import classNames from 'classnames';

import Scientist from '@/icons/Scientist';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={classNames(styles.mainContainer)}>
        <div className={classNames(styles.container)}>
          <div className={classNames(styles.welcomeContainer)}>
            <h2>Bem-vindo de volta</h2>

            <div>
              <Scientist />
            </div>
          </div>

          <main className={classNames(styles.main)}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
