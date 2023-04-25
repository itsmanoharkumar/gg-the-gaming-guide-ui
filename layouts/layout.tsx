// components/layout.js


import ApplicationHeader from '@/components/AppHeader';
import { ReactNode } from 'react';

export default function Layout({children}: { children: ReactNode }) {
  return (
    <>
      <ApplicationHeader/>
      <main>{children}</main>
    </>
  );
}
