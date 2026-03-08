/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence } from 'motion/react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Inspiration = lazy(() => import('./pages/Inspiration'));
const About = lazy(() => import('./pages/About'));
const Info = lazy(() => import('./pages/Info'));
const Loyalty = lazy(() => import('./pages/Loyalty'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-latte-100 text-coffee-900">
    <div className="animate-pulse font-serif text-xl">Laden...</div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="w-full">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/about" element={<About />} />
            <Route path="/info" element={<Info />} />
            <Route path="/klantenkaart" element={<Loyalty />} />
          </Routes>
        </Suspense>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
