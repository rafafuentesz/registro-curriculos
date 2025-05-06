export const getCurriculums = () => {
  try {
    const data = JSON.parse(localStorage.getItem("curriculums")) || [];

    return data.map((cv) => ({
      id: cv.id || crypto.randomUUID(),
      nombre: cv.nombre || "",
      email: cv.email || "",
      telefono: cv.telefono || "",
      descripcion: cv.descripcion || "",
      foto: cv.foto || "",
      educacion: Array.isArray(cv.educacion) ? cv.educacion : [],
      experiencia: Array.isArray(cv.experiencia) ? cv.experiencia : [],
    }));
  } catch (e) {
    console.warn("Curriculums corruptos en localStorage. Reseteando.");
    localStorage.removeItem("curriculums");
    return [];
  }
};

export const saveCurriculums = (data) => {
  localStorage.setItem("curriculums", JSON.stringify(data));
};
