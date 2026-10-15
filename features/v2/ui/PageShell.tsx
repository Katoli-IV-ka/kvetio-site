import type { ReactNode } from 'react';
import styles from '../v2.module.css';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';

/** Frame for the inner pages (contact, privacy): the same header, menu and footer as /v2. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <MobileMenu base='/v2' />
      <Header base='/v2' />
      <main className={styles.pageMain}>{children}</main>
      <Footer base='/v2' />
    </div>
  );
}
