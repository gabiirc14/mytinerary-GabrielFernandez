import axios from 'axios';

export const fetchCities = async (search) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/cities?name=${search}`);
    return Array.isArray(response.data.response) ? response.data.response : [];
  } catch (error) {
    throw new Error(error.message || "Error al cargar las ciudades");
  }
};
