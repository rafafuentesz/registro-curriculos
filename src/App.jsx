/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurriculumForm from "./components/CurriculumForm";
import CurriculumList from "./components/CurriculumList";
import CurriculumDetail from "./components/CurriculumDetail";
import { getCurriculums, saveCurriculums } from "./utils/localStorage";

function App() {
  const [curriculums, setCurriculums] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    setCurriculums(getCurriculums());
  }, []);

  const handleAddCurriculum = (newCurriculum) => {
    const updated = [...curriculums, newCurriculum];
    setCurriculums(updated);
    saveCurriculums(updated);
    setView("home");
  };

  const handleDelete = (id) => {
    const updated = curriculums.filter((c) => c.id !== id);
    setCurriculums(updated);
    saveCurriculums(updated);
    setSelectedCurriculum(null);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* VIDEO DE FONDO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 [image-rendering:crisp-edges] opacity-20"
      >
        <source src="/wasd.mp4" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      {/* CONTENIDO */}
      <div className="relative z-10 min-h-screen p-6 max-w-4xl mx-auto flex flex-col justify-center items-center text-center">
        <motion.h1
          style={{ fontFamily: "federalescort" }}
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Registro de Currículos
        </motion.h1>
        <motion.h6
          style={{ fontFamily: "federalescort" }}
          className="mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Rafael Fuentes
        </motion.h6>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              className="flex flex-col items-center gap-4"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView("form")}
                  className="bg-blue-600 hover:bg-blue-800 px-6 py-3 rounded-lg"
                >
                  Subir currículum
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView("list")}
                  className="bg-green-600 hover:bg-green-800 px-6 py-3 rounded-lg"
                >
                  Ver currículums
                </motion.button>
              </div>

              <motion.button
                onClick={() => {
                  localStorage.removeItem("curriculums");
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-600 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Limpiar localStorage (suele solucionar errores)
              </motion.button>
            </motion.div>
          )}

          {view === "form" && (
            <motion.div
              key="form"
              className="w-full"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <CurriculumForm onAdd={handleAddCurriculum} />
              <motion.button
                onClick={() => setView("home")}
                className="mt-4 px-4 py-2 bg-gray-600 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volver
              </motion.button>
            </motion.div>
          )}

          {view === "list" && (
            <motion.div
              key="list"
              className="w-full"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <CurriculumList
                curriculums={curriculums}
                onSelect={setSelectedCurriculum}
                onDelete={handleDelete}
              />
              {selectedCurriculum && (
                <CurriculumDetail curriculum={selectedCurriculum} />
              )}
              <motion.button
                onClick={() => setView("home")}
                className="mt-4 px-4 py-2 bg-gray-600 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volver
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
