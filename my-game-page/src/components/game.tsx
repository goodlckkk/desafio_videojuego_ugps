import { useEffect, useState } from "react";
import { getGameById } from "../services/rawgApiService";
import type { Game } from "../gameType";
import LoadingSpinner from "../loading/loading";
import { navigate } from "astro:transitions/client";

// Componente principal que muestra la información del juego basado en el ID proporcionado
const GameInfoId = (props: { gameId?: string }) => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Efecto que se ejecuta cuando el ID del juego cambia
  useEffect(() => {
    if (!props.gameId) return;
    setLoading(true);
    getGameById(props.gameId).then((data) => {
      setGame(data);
      setLoading(false);
      console.log(data);
    });
  }, [props.gameId]);

  // Función para alternar la visualización de la descripción completa del juego
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Muestra un spinner de carga mientras se obtiene la información del juego
  if (loading) {
    return <LoadingSpinner />;
  }

  // Función para manejar el evento de clic en el botón de retroceso
  const backOnClickHandler = () => {
    const parentPathName = location.pathname
      .replace(/\/$/, "")
      .split("/")
      .slice(0, -1)
      .join("/");
    navigate(!parentPathName ? "/" : parentPathName);
  };

  return (
    <>
      <button
        type="button"
        onClick={backOnClickHandler}
        className="text-white bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
      <section
        className="bg-white dark:bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${game?.background_image_additional})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
            <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
              {/* Título del juego */}
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
                {game?.name}
              </h1>
              {/* Géneros del juego */}
              <p className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white">
                {game?.genres?.map((genre) => genre.name).join(", ")}
              </p>
              {/* Descripción del juego */}
              <p className="mx-auto max-w-xl font-light lg:mx-0 xl:mb-8 md:text-lg xl:text-xl text-gray-400">
                {showFullDescription
                  ? game?.description_raw
                  : game?.description_raw?.substring(0, 200) + "..."}

                <button
                  onClick={toggleDescription}
                  className="text-blue-500 hover:underline"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              </p>
              {/* Fecha de lanzamiento */}
              <p className="text-base font-extrabold tracking-tight leading-none text-white">
                Fecha de lanzamiento : {game?.released?.toString()}
              </p>
              {/* Valoraciones */}
              <p className="text-base font-extrabold tracking-tight leading-none text-white">
                Valoraciones : {game?.rating}
              </p>
              {/* Plataformas disponibles */}
              <p className="text-base font-extrabold tracking-tight leading-none text-white">
                Plataformas Disponibles :{" "}
                {game?.platforms
                  ?.map((platform) => platform.platform.name)
                  .join(", ")}
              </p>
              {/* Desarrolladores */}
              <p className="text-base font-extrabold tracking-tight leading-none text-white">
                Desarrolladores :{" "}
                {game?.developers
                  ?.map((developer) => developer.name)
                  .join(", ")}
              </p>
            </div>
            <div className="col-span-6">
              {/* Video del juego */}
              <iframe
                className="mx-auto w-full max-w-xl h-64 rounded-lg sm:h-96"
                src={game?.clip?.clip}
                title="Clip video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GameInfoId;
