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

{curriculum.foto && (
        <motion.img
          src={curriculum.foto}
          alt="Foto del candidato"
          className="mb-3 w-32 h-32 object-cover rounded mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      )}
      <h2 className="text-xl font-bold mb-2">{curriculum.nombre}</h2>
      <p>
        <strong>Email:</strong> {curriculum.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {curriculum.telefono}
      </p>

      <h3 className="font-semibold mt-2">Educación</h3>
      {curriculum.educacion.map((edu, i) => (
        <p key={i}>
          {edu.titulo} – {edu.institucion} ({edu.anio})
        </p>
      ))}

      <h3 className="font-semibold mt-2">Experiencia Laboral</h3>
      {curriculum.experiencia.map((exp, i) => (
        <div key={i} className="mb-2">
          <p>
            {exp.empleador} – {exp.cargo}
          </p>
          <p>
            {exp.fechaInicio} a {exp.fechaFin}
          </p>
        </div>
      ))}
      <h3 className="font-semibold mt-2">Descripción</h3>
      <p>{curriculum.descripcion}</p>

    </motion.div>
  );
}

export default CurriculumDetail;
