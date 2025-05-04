/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CurriculumList({ curriculums, onSelect, onDelete }) {
  const [search, setSearch] = useState('');
  const [minAnio, setMinAnio] = useState('');

  const filtered = curriculums.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.titulo.toLowerCase().includes(term) ||
      c.empleador.toLowerCase().includes(term) ||
      c.descripcion.toLowerCase().includes(term)
    );
  }).filter((c) => !minAnio || parseInt(c.anio) >= parseInt(minAnio));

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
                className="border p-2 mb-2 flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <strong>{c.nombre}</strong> – {c.email}
                </div>
                <div>
                  <button onClick={() => onSelect(c)} className="text-blue-500 mr-2">
                    Ver
                  </button>
                  <button onClick={() => onDelete(c.id)} className="text-red-500">
                    Eliminar
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.div>
  );
}

export default CurriculumList;
