import type { ReactNode } from 'react';
import styles from '../v2.module.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';

/** Frame for the inner pages (contact, privacy, solutions): the same header, menu and footer as the home page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <MobileMenu base='/' />
      <Header base='/' />
      <main className={styles.pageMain}>{children}</main>
      <Footer base='/' />
    </div>
  );
}
