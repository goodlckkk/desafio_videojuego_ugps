import { useEffect, useState } from "react";
import { getGameById } from "../services/rawgApiService";
import type { Game } from "../gameType";
import LoadingSpinner from "../loading/loading";

const GameInfoId = (props: { gameId?: string }) => {
  const [game, setGame] = useState<Game>();
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!props.gameId) return;
    setLoading(true);
    getGameById(props.gameId).then((data) => {
      setGame(data);
      setLoading(false);
      console.log(data);
    });
  }, [props.gameId]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
            <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl dark:text-white">
                {game?.name}
              </h1>
              <p className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                {game?.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="mx-auto max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
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
              <p className="text-base font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                Fecha de lanzamiento : {game?.released?.toString()}
              </p>
              <p className="text-base font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                Valoraciones : {game?.rating}
              </p>
              <p className="text-base font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                Plataformas Disponibles :{" "}
                {game?.platforms
                  ?.map((platform) => platform.platform.name)
                  .join(", ")}
              </p>
            </div>
            <div className="col-span-6">
              <iframe
                className="mx-auto w-full max-w-xl h-64 rounded-lg sm:h-96"
                src={game?.clip?.clip}
                title="Clip video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400"></div>
        </div>
      </section>
    </>
  );
};

export default GameInfoId;
