"use client";
import { IoIosArrowBack } from "react-icons/io";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MoviesDetailsPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTkwNTdiY2NjNzI4YTIxOTcyNTZiZGMwZTVjODdmNyIsIm5iZiI6MTczMTQ5ODU0Mi4xODIzMDY1LCJzdWIiOiI2NzM0OTBmZWE2N2UzNmJiNjY4ZDkyZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.egwj0ALwfypDNUUjWQiH1pmWiLCkPr14FlDV7oC57Jw",
          },
        };
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-white mt-10">Loading details...</p>;
  }

  if (!movie) {
    return (
      <div className="p-8 text-center text-white">
        <p>Movie details could not be loaded.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex"
        >
         
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-4xl text-gray-900 mb-4">{movie.title}</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative w-full lg:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={350} // Adjust width for desired size
            height={525} // Maintain a 2:3 aspect ratio (adjust as needed)
            className="rounded-lg object-cover"
            alt={movie.title}
          />
        </div>
        <div className="lg:w-2/3">
          <p className="text-base mt-8 text-grey-900">{movie.overview}</p>
          <p className="text-xl mt-4 text-gray-900">
            Release Date: {movie.release_date}
          </p>
          <p className="text-xl mt-2 text-gray-900">
            Rating: {movie.vote_average}/10
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-4 py-2 bg-black hover:bg-black/80 text-white rounded-lg flex items-center justify-center gap-1"
      >
        <IoIosArrowBack className="mb-6px]" />
        Back to Home
      </button>
    </div>
  );
};

export default MoviesDetailsPage;
