import { motion } from "framer-motion"; // Importa motion per le animazioni
import { useNavigate } from "react-router";

/**
 * @component
 * A 404 page with animations and a button to go back to the homepage
 * @returns {JSX.Element} The 404 page
 */

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  /**
   * Navigates to the home page when called
   */
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 text-white">
      <motion.div
        className="text-center p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl font-extrabold mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          404
        </motion.h1>
        <motion.p className="text-xl mb-6" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
          Oops! La pagina che cerchi non è qui.
        </motion.p>
        <motion.button
          onClick={goHome}
          className="bg-white text-slate-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-slate-800 hover:text-white hover:border-white hover:border-2 transition"
          whileHover={{ scale: 1.05 }}
        >
          Torna alla Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
