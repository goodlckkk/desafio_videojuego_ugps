import React, { useEffect, useState } from "react";
import {
  getGames,
  getGenres,
  getPlataform,
  getPublishers,
  getTags,
} from "../services/rawgApiService";
import LoadingSpinner from "../loading/loading";
import { initFlowbite } from "flowbite";

const mainPage = () => {
  // Estados para almacenar datos y filtros
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [tags, setTags] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useEffect para inicializar Flowbite y cargar juegos y filtros al montar el componente
  useEffect(() => {
    initFlowbite();
    fetchGames();
    fetchFilters();
  }, [
    currentPage,
    selectedGenre,
    selectedYear,
    selectedPlatform,
    selectedTags,
    selectedPublisher,
    searchTerm,
  ]); // Añadir dependencias

  // Función para obtener juegos aplicando los filtros
  const fetchGames = () => {
    const filters: any = {
      page: currentPage,
      genres: selectedGenre,
      dates: selectedYear ? `${selectedYear}-01-01,${selectedYear}-12-31` : "",
      platforms: selectedPlatform,
      tags: selectedTags,
      publishers: selectedPublisher,
      search: searchTerm, // Incluir el término de búsqueda
    };

    getGames(filters).then((data) => {
      setGames(data.results);
      console.log(data);
      setTotalPages(data.count ? Math.ceil(data.count / 10) : 1); // Ajusta según el tamaño de página
    });
  };

  // Función para obtener los datos de los filtros
  const fetchFilters = () => {
    Promise.all([getGenres(), getPlataform(), getTags(), getPublishers()]).then(
      ([genresData, platformsData, tagsData, publishersData]) => {
        setGenres(genresData.results);
        setPlatforms(platformsData.results);
        setTags(tagsData.results);
        setPublisher(publishersData.results);
      }
    );
  };

  // Función para aplicar los filtros y reiniciar la página a la primera
  const applyFilters = () => {
    setCurrentPage(1);
    fetchGames();
  };

  // Función para limpiar los filtros y reiniciar la página a la primera
  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedPlatform("");
    setSelectedTags("");
    setSelectedPublisher("");
    setSearchTerm(""); // Limpiar el término de búsqueda
    setCurrentPage(1);
    fetchGames();
  };

  // Función para manejar la búsqueda por nombre
  const searchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Actualizar el estado del término de búsqueda
  };

  // Funciones para manejar los cambios en los filtros
  const filterByGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value);
  };

  const filterByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year); // Actualiza el estado del año seleccionado
  };

  const yearsDrop = Array.from({ length: 72 }, (_, i) => 1954 + i); // Rango: 1954 - 2025

  const filterByPlatforms = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const platform = e.target.value;
    setSelectedPlatform(platform);
  };

  const filterByTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    setSelectedTags(tag);
  };

  const filterByPublishers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publisher = e.target.value;
    setSelectedPublisher(publisher);
  };

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para obtener el rango de paginación
  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - 5);
    const end = Math.min(totalPages, currentPage + 5);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <section className="bg-blend-luminosit bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl text-center">
          <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
              <h3 className="mb-4 text-xl font-bold text-white">Filtros</h3>
              <div className="space-y-4">
                {/* Filtro de géneros */}
                <select
                  id="genres"
                  value={selectedGenre}
                  onChange={filterByGenre}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    Selecciona un género
                  </option>
                  {genres.map((item: any, index) => (
                    <option key={index} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="dates"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedYear}
                  onChange={filterByDate}
                >
                  <option value="" disabled hidden>
                    Escoge un año
                  </option>
                  {yearsDrop.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  id="platforms"
                  value={selectedPlatform}
                  onChange={filterByPlatforms}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    Selecciona una Plataforma
                  </option>
                  {platforms.map((item: any, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="tags"
                  value={selectedTags}
                  onChange={filterByTags}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    Selecciona un tag
                  </option>
                  {tags.map((item: any, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="publisher"
                  value={selectedPublisher}
                  onChange={filterByPublishers}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    Selecciona una empresa
                  </option>
                  {publisher.map((item: any, index) => (
                    <option key={index} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={applyFilters}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Aplicar filtros
                  </button>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Borrar filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={searchByName}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Busca tus juegos preferidos"
              required
            />
          </div>
          {/* Contenedor de la cuadricula */}
          <div className="grid py-4 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {games.map((item: any, index) => (
              <div key={index} className="text-gray-500">
                <a href={`/${item.id}`}>
                  <img
                    className="mx-auto mb-4 w-50 h-50 rounded-lg"
                    src={item.background_image}
                    alt={item.name}
                  />
                  <h5 className="mb-1 text-2xl font-bold tracking-tight text-white">
                    {item.name}
                  </h5>
                  <span className="text-start">
                    {" "}
                    {item?.platforms
                      ?.map((platform: any) => platform.platform.name)
                      .join(", ")}
                  </span>
                  <p>Puntuación: {item.rating}</p>
                  <p>Metacritic: {item.metacritic}</p>
                  <p>Fecha de lanzamiento: {item.released}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </a>
              </li>
              {getPaginationRange().map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === page
                        ? " hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white"
                        : " bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center px-3 h-8 leading-tight  rounded-e-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default mainPage;
