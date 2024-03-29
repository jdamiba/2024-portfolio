import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  interface CastCrew {
    name: string;
    known_for_department: string;
    job: string;
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?&api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
  );

  const data = await response.json();

  if (data.success == false || data === undefined) {
    return;
  }

  let result: string[] = [];

  data.credits.cast.map((member: CastCrew) => {
    if (
      member.known_for_department == "Acting" ||
      member.known_for_department == "Directing" ||
      member.known_for_department == "Writing" ||
      member.job == "Orignal Music Composer"
    ) {
      result.push(member.name);
    }
  });

  data.credits.crew.map((member: CastCrew) => {
    if (
      member.known_for_department == "Acting" ||
      member.known_for_department == "Directing" ||
      member.known_for_department == "Writing" ||
      member.job == "Orignal Music Composer"
    ) {
      result.push(member.name);
    }
  });

  return Response.json({ result });
}
