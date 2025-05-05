/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CurriculumDetail from "./CurriculumDetail";

function CurriculumList({ curriculums, onDelete }) {
  const [search, setSearch] = useState("");
  const [minAnio, setMinAnio] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleToggle = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const filtered = curriculums
    .filter((c) => {
      const term = search.toLowerCase();
      return (
        c.nombre.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.descripcion.toLowerCase().includes(term)
      );
    })
    .filter((c) => !minAnio || c.educacion.some(e => parseInt(e.anio) >= parseInt(minAnio)));

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-2">Currículos Registrados</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, email, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full"
        />
        <input
          type="number"
          placeholder="Año mínimo de graduación"
          value={minAnio}
          onChange={(e) => setMinAnio(e.target.value)}
          className="p-2 border"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No se encontraron currículos.</p>
      ) : (
        <ul>
          <AnimatePresence>
            {filtered.map((c) => (
              <motion.li
                key={c.id}
                className="border p-2 mb-2 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{c.nombre}</strong> – {c.email}
                    <div className="text-sm text-gray-600">
                      {c.educacion.length} estudios, {c.experiencia.length} experiencias
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleToggle(c.id)}
                      className="text-blue-500 mr-2"
                    >
                      {selectedId === c.id ? "Cerrar detalle" : "Ver"}
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedId === c.id && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CurriculumDetail curriculum={c} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.div>
  );
}

export default CurriculumList;
