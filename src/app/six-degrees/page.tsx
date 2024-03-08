"use client";

import type { NextPage } from "next";
import { use, useState, useEffect } from "react";
var capitalize = require("capitalize");

const SixDegrees: NextPage = () => {
  interface CastCrew {
    name: string;
  }

  const [moviesArr, setMoviesArr] = useState<Array<string>>(["Oppenheimer"]);

  const [inputText, setInputText] = useState("");

  const [inputMovieCastCrew, setInputMovieCastCrew] = useState<
    Array<string> | undefined
  >([]);

  const [starterCastCrew, setStarterCastCrew] = useState<
    Array<string> | undefined
  >([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    },
  };

  const getMovieIDFromName = async (movie: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=cda8047de6d3e28539d68a54af758d45`
    );

    const data = await response.json();

    if (data.success == false || data.results.length === 0) {
      return;
    }

    return data!.results[0].id;
  };

  const getCastCrewFromID = async (id: string) => {
    if (!id) {
      return;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?&api_key=cda8047de6d3e28539d68a54af758d45&append_to_response=credits`
    );

    const data = await response.json();

    if (data.success == false) {
      return;
    }

    let result: string[] = [];

    data.credits.cast.map((member: CastCrew) => {
      result.push(member.name);
    });

    data.credits.crew.map((member: CastCrew) => {
      result.push(member.name);
    });

    return result;
  };

  useEffect(() => {
    async function loadBarbieData() {
      let barbieID = await getMovieIDFromName("Barbie");
      let barbieCastCrew: string[] | undefined = await getCastCrewFromID(
        barbieID
      );

      setStarterCastCrew(barbieCastCrew);
    }

    loadBarbieData();
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    async function getInputMovieData() {
      let movieID = await getMovieIDFromName(inputText);
      if (movieID == undefined) {
        setInputMovieCastCrew([]);
        return;
      }
      let movieCastCrew: string[] | undefined = await getCastCrewFromID(
        movieID
      );
      setInputMovieCastCrew(movieCastCrew);
      if (!moviesArr.includes(inputText)) {
        setMoviesArr([...moviesArr, capitalize.words(inputText)]);
        setStarterCastCrew(movieCastCrew);
        setInputText("");
      }
    }

    getInputMovieData();
  };

  let intersectionExists = starterCastCrew?.some((r) =>
    inputMovieCastCrew?.includes(r)
  );

  let intersection;

  if (intersectionExists) {
    intersection = starterCastCrew?.filter((value) =>
      inputMovieCastCrew?.includes(value)
    );
  }

  return (
    <>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Six Degrees</h2>
            </div>
          </div>
        </div>
        <h3>Introduction</h3>
        <p>
          Six Degrees is a classic game for movie lovers where the goal is to
          build a chain of movies using the cast and crew as links.
        </p>
        <p>
          Players play by entering the title of a movie that has a cast or crew
          member who was also in the previously entered movie.
        </p>

        <h3>Component Design</h3>
        <p>
          This component will consist of an input area, where users can type in
          the title of a movie. Above the input area will be displayed a running
          list of the connections that the user has made. The goal is to make as
          long of a chain as you can without using Google or IMDB.
        </p>

        <h3>Component</h3>

        <div className="movie-component-container">
          <form onSubmit={onSubmit}>
            <input type="text" value={inputText} onChange={onInputChange} />
          </form>
          <div className="movie-titles-container">
            {moviesArr?.map((member) => {
              return <div className="movie-title">{member}</div>;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SixDegrees;
