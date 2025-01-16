import { useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "./LoadingSpinner";
import AddFavsButton from "@/components/AddFavsButton";
import AddWatchlistButton from "@/components/AddWatchlistButton";
import CommentSection from "@/components/CommentSection";
import MovieCarousel from "@/components/MovieCarousel";
import useStore from "@/store/store";
import { MovieDetails, Trailer, TrailerResponse } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import YoutubeTrailer from "./YoutubeTrailer";

const ClientMovieDetails = ({
  id,
  mediaType,
}: {
  id: number;
  mediaType: "movie" | "tv";
}) => {
  const [imageError, setImageError] = useState(false);

  const user = useStore((state) => state.user);
  const { data: movieDetails } = useSWR<MovieDetails>(
    id ? `/api/details?type=${mediaType}&id=${id}` : null,
    fetcher
  );
  const { data: similarMovies } = useSWR(
    movieDetails ? `/api/similar?type=${mediaType}&id=${id}` : null,
    fetcher
  );

  const { data: trailers } = useSWR<TrailerResponse>(
    id ? `/api/trailers?type=${mediaType}&id=${id}` : null,
    fetcher
  );
  const ytLinkArr: string[] = [];

  if (!movieDetails || !similarMovies) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    );
  }

  function trailerJsonToYoutubeLink(trailer: Trailer): string {
    if (trailer.site === "YouTube") {
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    } else {
      return "Not a YouTube trailer";
    }
  }

  if (trailers) {
    trailers.results.forEach((trailer) => {
      ytLinkArr.push(trailerJsonToYoutubeLink(trailer));
    });
  }

  // Handle image load error
  const handleImageError = () => setImageError(true);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-4 text-white">
          {movieDetails.title || movieDetails.name}
        </h1>
      </div>
      {ytLinkArr.length != 0 ? <YoutubeTrailer trailers={ytLinkArr} /> : <></>}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {ytLinkArr.length == 0 ? (
          <Image
            src={
              imageError
                ? "/images/movie-poster-placeholder.png"
                : `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            }
            alt={movieDetails.title || movieDetails.name || "No title"}
            width={500}
            height={750}
            className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-lg"
            onError={handleImageError}
          />
        ) : (
          <></>
        )}
        <div className="text-white md:w-2/3">
          <p className="mb-4">{movieDetails.overview}</p>
          <p className="text-lg mb-2">
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p className="text-lg mb-2">
            <strong>Rating:</strong> {movieDetails.vote_average}
          </p>
          <p className="text-lg">
            <strong>Genres:</strong>{" "}
            {movieDetails.genres?.map((genre: any) => genre.name).join(", ")}
          </p>
          {user ? (
            <div className="mt-4 flex gap-2">
              <AddFavsButton id={movieDetails.id} mediaType={mediaType} />
              <AddWatchlistButton id={movieDetails.id} mediaType={mediaType} />
            </div>
          ) : null}
        </div>
      </div>
      <CommentSection mediaId={movieDetails.id} mediaType={mediaType} />
      <div className="mt-8">
        <MovieCarousel
          movies={similarMovies.results}
          title="You may also like"
          type={mediaType}
        />
      </div>
    </div>
  );
};

export default ClientMovieDetails;
