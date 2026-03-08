import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-latte-100 text-coffee-900 font-sans selection:bg-gold-500 selection:text-white">
      <a href="#main-content" className="skip-to-content">Ga naar inhoud</a>
      <Navbar />
      <main id="main-content" className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
