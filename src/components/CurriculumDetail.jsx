/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function CurriculumDetail({ curriculum }) {
  return (
    <motion.div
      className="border p-4 mt-4 rounded"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-2">{curriculum.nombre}</h2>
      <p><strong>Email:</strong> {curriculum.email}</p>
      <p><strong>Teléfono:</strong> {curriculum.telefono}</p>

      <h3 className="font-semibold mt-2">Educación</h3>
      <p>{curriculum.titulo} – {curriculum.institucion} ({curriculum.anio})</p>

      <h3 className="font-semibold mt-2">Experiencia Laboral</h3>
      <p>{curriculum.empleador} – {curriculum.cargo}</p>
      <p>{curriculum.fechaInicio} a {curriculum.fechaFin}</p>
      <p>{curriculum.descripcion}</p>

      {curriculum.foto && (
        <motion.img
          src={curriculum.foto}
          alt="Foto del candidato"
          className="mt-4 w-32 h-32 object-cover rounded"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      )}
    </motion.div>
  );
}

export default CurriculumDetail;
