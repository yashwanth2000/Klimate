import { Link } from "react-router-dom";
import CitySearch from "./CitySearch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-provider";
import Logo1 from "../assets/logo.png";
import Logo2 from "../assets/logo2.png";
import { motion } from "framer-motion";

export function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to={"/"}>
            <img
              src={isDark ? Logo1 : Logo2}
              alt="Klimate logo"
              className="h-14"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex gap-4"
        >
          <CitySearch />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
