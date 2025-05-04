export const getCurriculums = () => {
    const data = localStorage.getItem('curriculums');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveCurriculums = (data) => {
    localStorage.setItem('curriculums', JSON.stringify(data));
  };
  