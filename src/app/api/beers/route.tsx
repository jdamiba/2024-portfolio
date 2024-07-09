import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const beers = ["IPA, Pale Ale, Lager"];

  return Response.json({ beers });
}
