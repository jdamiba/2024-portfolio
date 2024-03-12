"use client";

import { count } from "console";
import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
var capitalize = require("capitalize");

const SixDegrees: NextPage = () => {
  interface CastCrew {
    name: string;
  }

  const [moviesArr, setMoviesArr] = useState<Array<string>>(["Barbie"]);

  const [linksArr, setLinksArr] = useState<Array<string>>([]);

  const [error, setError] = useState("");

  const [inputText, setInputText] = useState("");

  const [allCastCrew, setAllCastCrew] = useState<
    Array<Array<string> | undefined>
  >([]);

  const [inputMovieCastCrew, setInputMovieCastCrew] = useState<
    Array<string> | undefined
  >([]);

  const [starterCastCrew, setStarterCastCrew] = useState<
    Array<string> | undefined
  >([]);

  // given a movie name as a string, return that movie's ID from TMDB if it exists.
  const getMovieIDFromName = async (movie: string) => {
    const response = await fetch(`/api/getID?query=${movie}`);

    const data = await response.json();

    if (data.success == false || data.data.results.length === 0) {
      return;
    }

    return data!.data.results[0].id;
  };

  // given a movie ID, return the cast and crew as an array of names
  const getCastCrewFromID = async (id: string) => {
    if (!id) {
      return;
    }
    const response = await fetch(`/api/getCastCrew?query=${id}`);

    const data = await response.json();

    if (data.success == false || data === undefined) {
      return;
    }

    return data.result;
  };

  // when the page loads, get the data related to Barbie and store it in state
  useEffect(() => {
    async function loadBarbieData() {
      let barbieID = await getMovieIDFromName("Barbie");
      let barbieCastCrew: string[] | undefined = await getCastCrewFromID(
        barbieID
      );

      setStarterCastCrew(barbieCastCrew);
      setAllCastCrew([...allCastCrew, barbieCastCrew]);
    }

    loadBarbieData();
  }, []);

  // update component state when user types in input area
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const containsThree = (array: any) => {
    let occurrences = array.reduce(
      (acc: any, value: any) => ((acc[value] = -~acc[value]), acc),
      {}
    );

    for (const [key, value] of Object.entries(occurrences)) {
      if (value == 3) {
        return true;
      }
    }
    return false;
  };

  // when user hits enter on their keyboard, get the movieID of the input text, if it matches a movie in the API DB
  // from the movie ID, get the cast and crew. if there is an intersection between the two movies, then add the input
  // movie to the moviesArr. make the starterMovie equal to the input movie and clear the input area, waiting for another
  // movie title
  // only add if input text movie is not already in the array of movies
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (moviesArr.includes(capitalize(inputText))) {
      setError("Movie already used!");
      return;
    }
    async function getInputMovieData() {
      let movieID = await getMovieIDFromName(inputText);
      if (movieID == undefined) {
        setInputMovieCastCrew([]);
        setError("Movie not found!");

        return;
      }
      let movieCastCrew: string[] | undefined = await getCastCrewFromID(
        movieID
      );
      setInputMovieCastCrew(movieCastCrew);
      if (!moviesArr.includes(capitalize(inputText))) {
        // moviesArr does not already contain input movie
        if (isThereIntersection(starterCastCrew, movieCastCrew)) {
          // there is an intersection

          let intersection = getIntersectionOfCastsAsArray(
            starterCastCrew,
            movieCastCrew
          );

          if (!containsThree(linksArr)) {
            //if linksArr doesn't contain the same name more than 3 times
            setLinksArr([...linksArr, ...intersection]);

            setMoviesArr([...moviesArr, capitalize.words(inputText)]);
            setStarterCastCrew(movieCastCrew);
            setAllCastCrew([...allCastCrew, movieCastCrew]);
            setError("");

            setInputText("");
            return;
          } else {
            setError("Same Link cannot be used more than 3 times!");
          }
        } else {
          setError("No Links Found!");
          return;
        }
      }
    }

    getInputMovieData();
  };

  const isThereIntersection = (
    castCrewA: string[] | undefined,
    castcrewB: string[] | undefined
  ) => {
    const found = castCrewA?.some((r) => castcrewB?.includes(r));

    return found;
  };

  const getIntersectionOfCasts = (index1: number, index2: number) => {
    const filteredArray = allCastCrew[index1]?.filter((value) =>
      allCastCrew[index2]?.includes(value)
    );

    let uniques = new Set(filteredArray);

    let uniquesAsArray = Array.from(uniques);

    return uniquesAsArray?.map((member, index) => {
      console.log(countInLinks(member));

      if (countInLinks(member) == 1) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}X
          </div>
        );
      }

      if (countInLinks(member) == 2) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}XX
          </div>
        );
      }

      if (countInLinks(member) == 3) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}XXX
          </div>
        );
      }
    });
  };

  const countInLinks = (name: string): number | unknown => {
    let occurrences = linksArr.reduce(
      (acc: any, value: any) => ((acc[value] = -~acc[value]), acc),
      {}
    );

    for (const [key, value] of Object.entries(occurrences)) {
      if (key === name) {
        return value;
      }
    }

    return -1;
  };

  const getIntersectionOfCastsAsArray = (
    movie1: string[] | undefined,
    movie2: string[] | undefined
  ) => {
    const filteredArray = movie1?.filter((value) => movie2?.includes(value));

    let uniques = new Set(filteredArray);

    let uniquesAsArray = Array.from(uniques);

    return uniquesAsArray;
  };

  return (
    <>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Six Degrees Movie Game</h2>
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
          member who was also in the previously entered movie. A movie can only
          be used once in a chain.
        </p>

        <h3>Component Design</h3>
        <p>
          This component will consist of an input area, where users can type in
          the title of a movie. Below the input area will be displayed a running
          list of the connections that the user has made, including the cast or
          crew members who comprise the intersection.
        </p>
        <p>
          This component pulls data about movies from the{" "}
          <Link href="https://www.themoviedb.org/?language=en-US">TMDB</Link>{" "}
          API.
        </p>

        <h3>Component</h3>

        <div className="movie-component-container">
          <div className="movie-component">
            <form onSubmit={onSubmit}>
              <input
                className="movie-input"
                type="text"
                value={inputText}
                onChange={onInputChange}
              />
              {error && <div className="error-text">{error}</div>}
            </form>
            <div className="movie-titles-container">
              {moviesArr?.map((member, index) => {
                return (
                  <div key={index}>
                    <div className="movie-title">{member}</div>
                    {index === moviesArr.length - 1 ? (
                      ""
                    ) : (
                      <div className="link-container">
                        {getIntersectionOfCasts(index, index + 1)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SixDegrees;
