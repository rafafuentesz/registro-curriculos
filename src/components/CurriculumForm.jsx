/* eslint-disable no-unused-vars */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

function CurriculumForm({ onAdd }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    educacion: [{ titulo: "", institucion: "", anio: "" }],
    experiencia: [{ empleador: "", cargo: "", fechaInicio: "", fechaFin: "" }],
    descripcion: "",
    foto: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, foto: reader.result });
    reader.readAsDataURL(file);
  };

  // Educación
  const handleEducacionChange = (i, e) => {
    const updated = [...form.educacion];
    updated[i][e.target.name] = e.target.value;
    setForm({ ...form, educacion: updated });
  };

  const addEducacion = () => {
    setForm({
      ...form,
      educacion: [...form.educacion, { titulo: "", institucion: "", anio: "" }],
    });
  };

  // Experiencia
  const handleExperienciaChange = (i, e) => {
    const updated = [...form.experiencia];
    updated[i][e.target.name] = e.target.value;
    setForm({ ...form, experiencia: updated });
  };

  const addExperiencia = () => {
    setForm({
      ...form,
      experiencia: [
        ...form.experiencia,
        { empleador: "", cargo: "", fechaInicio: "", fechaFin: "" },
      ],
    });
  };

  // (Todo el código anterior sigue igual hasta el return)

  const removeEducacion = (index) => {
    const updated = form.educacion.filter((_, i) => i !== index);
    setForm({ ...form, educacion: updated });
  };

  const removeExperiencia = (index) => {
    const updated = form.experiencia.filter((_, i) => i !== index);
    setForm({ ...form, experiencia: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: uuidv4(), ...form });
    setForm({
      nombre: "",
      email: "",
      telefono: "",
      educacion: [{ titulo: "", institucion: "", anio: "" }],
      experiencia: [
        { empleador: "", cargo: "", fechaInicio: "", fechaFin: "" },
      ],
      descripcion: "",
      foto: "",
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
        <h3 className="text-lg font-semibold mb-2 text-left">
          Datos personales
        </h3>
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </motion.div>

      {/* Educación */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">Educación</h3>
        {form.educacion.map((edu, i) => (
          <div key={i} className="mb-4 border p-2 rounded text-white relative">
            <input
              name="titulo"
              placeholder="Título"
              value={edu.titulo}
              onChange={(e) => handleEducacionChange(i, e)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="institucion"
              placeholder="Institución"
              value={edu.institucion}
              onChange={(e) => handleEducacionChange(i, e)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="anio"
              placeholder="Año"
              value={edu.anio}
              onChange={(e) => handleEducacionChange(i, e)}
              className="w-full p-2 border rounded"
            />
            {form.educacion.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducacion(i)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                X
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addEducacion}
          className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
        >
          + Añadir educación
        </button>
      </motion.div>

      {/* Experiencia */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">
          Experiencia laboral
        </h3>
        {form.experiencia.map((exp, i) => (
          <div
            key={i}
            className="mb-4 border p-2 rounded text-white relative"
          >
            <input
              name="empleador"
              placeholder="Empresa"
              value={exp.empleador}
              onChange={(e) => handleExperienciaChange(i, e)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="cargo"
              placeholder="Cargo"
              value={exp.cargo}
              onChange={(e) => handleExperienciaChange(i, e)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="fechaInicio"
              placeholder="Inicio"
              value={exp.fechaInicio}
              onChange={(e) => handleExperienciaChange(i, e)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              name="fechaFin"
              placeholder="Fin"
              value={exp.fechaFin}
              onChange={(e) => handleExperienciaChange(i, e)}
              className="w-full p-2 border rounded"
            />
            {form.experiencia.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperiencia(i)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                X
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addExperiencia}
          className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
        >
          + Añadir experiencia
        </button>
      </motion.div>

      {/* Descripción */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mt-4 mb-2 text-left">
          Descripción
        </h3>
        <textarea
          name="descripcion"
          placeholder="Breve descripción o logros"
          onChange={handleChange}
          value={form.descripcion}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />
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
