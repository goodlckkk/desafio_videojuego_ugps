import { sendGet } from "./httpService";

const urlBase = "https://api.rawg.io/api";
const apiKey = "c542e67aec3a4340908f9de9e86038af";

// Tipo que define los parámetros de filtro para las consultas
type filterParams = {
  search?: string;
  ordering?: string;
  page?: number;
  platforms?: string;
  developers?: string;
  tags?: string;
  dates?: string;
  genres?: string;
  publishers?: string;
};

// Función para obtener una lista de juegos con filtros opcionales
export const getGames = async (filterParams?: filterParams) => {
  try {
    const queryString = filterParams
      ? Object.entries(filterParams)
          .filter(([_, value]) => value !== undefined && value !== "") // Excluimos claves con valores no válidos
          .map(
            ([key, value]) => `${key}=${encodeURIComponent(value as string)}`
          )
          .join("&") // Unimos los pares clave=valor con "&"
      : "";
    const response = await sendGet(
      `${urlBase}/games?key=${apiKey}&ordering=-metacritic&${queryString}&page_size=20`
    );
    return response;
  } catch (error) {
    console.error("Error obteniendo los juegos:", error);
  }
};

// Función para obtener la lista de plataformas
export const getPlataform = async () => {
  try {
    const response = await sendGet(`${urlBase}/platforms?key=${apiKey}`);
    return response;
  } catch (error) {
    console.error("Error al cargar las plataformas:", error);
  }
};

// Función para obtener la lista de géneros
export const getGenres = async () => {
  try {
    const response = await sendGet(`${urlBase}/genres?key=${apiKey}`);
    return response;
  } catch (error) {
    console.error("Error al cargar los géneros:", error);
  }
};

// Función para obtener la lista de tags
export const getTags = async () => {
  try {
    const response = await sendGet(`${urlBase}/tags?key=${apiKey}`);
    return response;
  } catch (error) {
    console.error("Error al cargar los tags", error);
  }
};

// Función para obtener la lista de publishers
export const getPublishers = async () => {
  try {
    const response = await sendGet(`${urlBase}/publishers?key=${apiKey}`);
    return response;
  } catch (error) {
    console.error("Error al cargar los creadores", error);
  }
};

// Función para obtener los detalles de un juego por su ID
export const getGameById = async (id: string) => {
  try {
    const response = await sendGet(`${urlBase}/games/${id}?key=${apiKey}`);
    return response;
  } catch (error) {
    console.error("Error al cargar los detalles del juego", error);
  }
};
