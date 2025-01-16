import { NextResponse } from "next/server";
import { TMDB_BASE_URL } from "@/constants/constants";

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json(
      { error: "Missing type or id parameter" },
      { status: 400 }
    );
  }

  const endpoint = `${TMDB_BASE_URL}/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}?language=en-US`;

  try {
    console.log(process.env.TMDB_ACCESS_TOKEN);
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
        }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch ${type} trailer` },
        { status: response.status }
      );
    }


    const data = await response.json();
    const youtubeTrailers = data.results.filter((video) => video.site === 'YouTube');
    
    const firstThreeYoutubeTrailers = youtubeTrailers.slice(0, 3);
    return NextResponse.json({results: firstThreeYoutubeTrailers});
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
