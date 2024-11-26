import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGM1OGRiYmNmMmQxYjE1Y2U4YmU0NzY1ZDcyMmNkMyIsIm5iZiI6MTczMjYwNzE1Mi40MTEyOTA2LCJzdWIiOiI2NzQ0MzY1NTgzMTU4YjBiMjY0N2U0ZjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LfaT9HjS4cxbInAkpFwqUxh2cPE3n_GZfyBXU060_4Q",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular",
    options
  );
  const data = await response.json();
  const movies = data.results;

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-extrabold mb-4 text-gray-900">
        Trending Movies
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`}>
            <div
              className="bg-black rounded-lg overflow-hidden shadow-md flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="relative h-80 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  layout="fill"
                  className="object-cover object-top"
                  alt={`Poster of ${movie.title}`}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-white">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
