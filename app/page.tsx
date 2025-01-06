import axiosInstance from "../utils/axiosInstance";
import ScrollableMovieList from "./ScrollableMovieList";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

async function fetchMovies(): Promise<Movie[]> {
  const response = await axiosInstance.get("/discover/movie");
  return response.data.results;
}

export default async function Home() {
  const movies = await fetchMovies();
  const topMovie = movies[0]; // Display the first movie as the banner

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${topMovie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-5xl ">{topMovie.title}</h1>
          <p className="text-xl font-bold py-4 px-6">{topMovie.overview}</p>
          <div
            style={{
              fontSize: "1rem",
              textAlign: "center",
              marginTop: "1rem",
              color: "#ddd",
            }}
          >
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4 w-fit mx-auto backdrop-blur-sm shadow-lg">
              <p className="mb-2 text-white text-center">
                <span
                  className="bg-white text-black font-bold px-3 py-1 rounded-full mr-2"
                  style={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Release Date
                </span>
                {new Date(topMovie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-white text-center">
                <span
                  className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full mr-2"
                  style={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  IMDB Rating
                </span>
                ⭐ {topMovie.vote_average.toFixed(1)} / 10
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold py-4 px-6">Upcoming movies</h1>
        <ScrollableMovieList movies={movies} />
      </div>
    </>
  );
}
