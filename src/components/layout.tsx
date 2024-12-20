import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps extends PropsWithChildren {
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  const currentYear = new Date().getFullYear();

  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-background via-background/90 to-muted transition-all duration-500 ease-in-out dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`flex-grow container mx-auto px-4 py-8 mb-8 ${className}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="relative mt-auto border-t border-b-0 border-x-0 border-gray-200 dark:border-gray-700/30 backdrop-blur-md py-12 bg-white/50 dark:bg-gray-900/50 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/50 transition-all duration-300 hover:backdrop-blur-lg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="container mx-auto px-2 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
            Made with{" "}
            <span className="inline-block transform hover:scale-125 transition-transform duration-300 hover:rotate-12">
              ❤️
            </span>{" "}
            By{" "}
            <span className="relative inline-block font-medium text-primary hover:text-primary/80 transition-colors duration-200 group">
              Klimate
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </span>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} Klimate. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Layout;