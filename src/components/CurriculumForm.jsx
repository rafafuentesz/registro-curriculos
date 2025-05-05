/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

function CurriculumForm({ onAdd }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    titulo: '',
    institucion: '',
    anio: '',
    empleador: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: '',
    foto: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, foto: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), ...form });
    setForm({
      nombre: '', email: '', telefono: '', titulo: '', institucion: '', anio: '',
      empleador: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', foto: ''
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="text-center space-y-4 mb-6 border p-6 rounded shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Datos personales */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-left">Datos personales</h3>
        <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" required />
        <input name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange}
          className="w-full p-2 border rounded" />
      </motion.div>

      {/* Educación */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">Educación</h3>
        <input name="titulo" placeholder="Último título obtenido" value={form.titulo} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" />
        <input name="institucion" placeholder="Institución educativa" value={form.institucion} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" />
        <input name="anio" placeholder="Año de graduación o previsto" value={form.anio} onChange={handleChange}
          className="w-full p-2 border rounded" />
      </motion.div>

      {/* Experiencia */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">Experiencia laboral</h3>
        <input name="empleador" placeholder="Empresa" value={form.empleador} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" />
        <input name="cargo" placeholder="Cargo" value={form.cargo} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" />
        <input name="fechaInicio" placeholder="Fecha de inicio" value={form.fechaInicio} onChange={handleChange}
          className="w-full p-2 mb-2 border rounded" />
        <input name="fechaFin" placeholder="Fecha de fin" value={form.fechaFin} onChange={handleChange}
          className="w-full p-2 border rounded" />
      </motion.div>

      {/* Descripción */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">Descripción</h3>
        <textarea name="descripcion" placeholder="Breve descripción o logros"
          onChange={handleChange} value={form.descripcion}
          className="w-full p-2 border rounded"
        />
      </motion.div>

      {/* Foto */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">Foto</h3>
        <input type="file" accept="image/*" onChange={handleImage} className="w-full" />
      </motion.div>

      {/* Botón */}
      <motion.button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Registrar
      </motion.button>
    </motion.form>
  );
}

export default CurriculumForm;
