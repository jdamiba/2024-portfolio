import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
   
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();
       
    return Response.json({ data })
  }