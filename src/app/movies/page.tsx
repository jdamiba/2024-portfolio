"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

var capitalize = require("capitalize");

interface Movie {
  title: string;
}

const Movies: NextPage = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 59);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  const [gameOver, setGameOver] = useState(false);

  const [kevinBacon, setKevinBacon] = useState(false);

  // the titles of all of the movies in the connection chain
  // e.g., ["Barbie", "Amsterdam", "Babylon"]
  const [movieTitles, setMovieTitles] = useState<Array<string>>(["Barbie"]);

  // the names of all cast and crew in the connection chain
  // e.g., ["Noah Baumbach", "Greta Gerwig", "George Drakoulias"]
  const [castCrewConnections, setCastCrewConnections] = useState<Array<string>>(
    []
  );

  // an error message
  // e.g., "Movie not found"
  const [error, setError] = useState("");

  // the text in the input area
  // e.g., "Amsterdam"
  const [inputText, setInputText] = useState("");

  // an array of arrays. each sub-array is the entire cast and crew of a movie in the connection chain
  // e.g., [["Noah Baumbach", "Greta Gerwig", "George Drakoulias"], ["Noah Baumbach", "Greta Gerwig", "George Drakoulias"], ["Noah Baumbach", "Greta Gerwig", "George Drakoulias"]]
  const [fullListOfCastCrew, setFullListOfCastCrew] = useState<
    Array<Array<string>>
  >([]);

  // the cast and crew of the first movie in the connection chain
  // e.g., ["Noah Baumbach", "Greta Gerwig", "George Drakoulias"]
  const [starterCastCrew, setStarterCastCrew] = useState<Array<string>>([]);

  // given a movie name as a string, return that movie's ID from TMDB, if it exists.
  // this function is never called without an input
  const getMovieIDFromName = async (movie: string) => {
    const response = await fetch(`/api/getID?query=${movie}`);

    const data = await response.json();

    console.log(data);

    let filtered = data.data.results.filter((result: Movie) => {
      return capitalize.words(result.title) == capitalize.words(movie);
    });

    if (filtered.length === 0) {
      return;
    } else {
      return filtered[0].id;
    }
  };

  // given a movie ID, return the cast and crew as an array of names
  // this function is never called without an input
  const getCastCrewFromID = async (id: string) => {
    const response = await fetch(`/api/getCastCrew?query=${id}`);

    const data = await response.json();

    if (data.result.length === 0) {
      return;
    } else {
      return data.result;
    }
  };

  async function loadStarterData() {
    let barbieID = await getMovieIDFromName(movieTitles[0]);
    if (barbieID === undefined) {
      setError("Could not get starter movie ID from TMDB");
      return;
    }
    let barbieCastCrew: string[] = await getCastCrewFromID(barbieID);

    setStarterCastCrew(barbieCastCrew);
    setFullListOfCastCrew([...fullListOfCastCrew, barbieCastCrew]);
  }

  // when the page loads, get the data related to the starter movie and store it in state
  useEffect(() => {
    loadStarterData();
  }, []);

  // update component state when user types in input area
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const isKevinBaconInMovie = (movieCastCrew) => {
    let found = false;
    movieCastCrew.map((member) => {
      if (member == "Kevin Bacon") {
        found = true;
      }
      return;
    });

    return found;
  };

  // given an array of strings, check if one of the strings occurs three times
  // if so, return the string, if not return false
  const containsThree = (array: string[]) => {
    let occurrences = array.reduce(
      (acc: any, value: any) => ((acc[value] = -~acc[value]), acc),
      {}
    );

    for (const [key, value] of Object.entries(occurrences)) {
      if (value == 3) {
        return key;
      }
    }
    return false;
  };

  // runs when the user attemps to submit a movie to add to the connections chain
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRunning) {
      setError("Timer not started!");
      return;
    }

    async function getInputMovieData() {
      let movieID = await getMovieIDFromName(inputText);

      // return early if the input text does not match a movie title
      if (movieID == undefined) {
        setError("Movie not found!");
        return;
      }

      let movieCastCrew: string[] = await getCastCrewFromID(movieID);

      // return early if unable to retrieve cast and crew from API
      if (movieCastCrew === undefined) {
        setError("Unable to retrieve cast and crew!");
        return;
      }

      // user cannot enter same movie more than once
      if (movieTitles.includes(capitalize.words(inputText))) {
        setError("Movie already used!");
        return;
      }

      // return early if no connections found
      if (isThereIntersection(starterCastCrew, movieCastCrew) === false) {
        setError("No Links Found!");
        return;
      }

      // user cannot use same connection more than three times
      if (containsThree(castCrewConnections)) {
        setError(
          `${containsThree(
            castCrewConnections
          )} cannot be used more than 3 times!`
        );
        return;
      }

      let intersection = getIntersectionOfCastsAsArray(
        starterCastCrew,
        movieCastCrew
      );

      setCastCrewConnections([...castCrewConnections, ...intersection]);
      setMovieTitles([...movieTitles, capitalize.words(inputText)]);
      setStarterCastCrew(movieCastCrew);
      setKevinBacon(isKevinBaconInMovie(movieCastCrew));
      setFullListOfCastCrew([...fullListOfCastCrew, movieCastCrew]);
      setError("");
      setInputText("");

      const time = new Date();
      time.setSeconds(time.getSeconds() + 59);
      restart(time, true);

      return;
    }

    getInputMovieData();
  };

  // returns true if there is an intersection between the two casts
  const isThereIntersection = (castCrewA: string[], castcrewB: string[]) => {
    const found = castCrewA?.some((r) => castcrewB?.includes(r));
    return found;
  };

  // returns the intersection of two movies as markup
  const getIntersectionOfCasts = (index1: number, index2: number) => {
    const filteredArray = fullListOfCastCrew[index1]?.filter((value) =>
      fullListOfCastCrew[index2]?.includes(value)
    );

    let uniques = new Set(filteredArray);

    let uniquesAsArray = Array.from(uniques);

    return uniquesAsArray?.map((member, index) => {
      if (numberOfTimesInCastCrewConnections(member) == 1) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}
            <i className="fa fa-times" />
          </div>
        );
      }

      if (numberOfTimesInCastCrewConnections(member) == 2) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}
            <i className="fa fa-times" />
            <i className="fa fa-times" />
          </div>
        );
      }

      if (numberOfTimesInCastCrewConnections(member) == 3) {
        return (
          <div key={index}>
            <i className="fa fa-link" />
            {member}
            <i className="fa fa-times" />
            <i className="fa fa-times" />
            <i className="fa fa-times" />
          </div>
        );
      }
    });
  };

  // returns the number of times a connection is present in the castCrewConnections array
  const numberOfTimesInCastCrewConnections = (
    name: string
  ): number | unknown => {
    let occurrences = castCrewConnections.reduce(
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

  // given two arrays of caste and crew, return the intersection as an array
  const getIntersectionOfCastsAsArray = (
    movie1: string[],
    movie2: string[]
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
              <h2>Six Degrees of Kevin Bacon</h2>
            </div>
          </div>
        </div>
        <h3>Introduction</h3>
        <p>
          Six Degrees is a game that tests your knowledge of popular movies and
          their casts and crews. The goal of the game is to form the shortest
          chain from the starting movie, Barbie, to a movie that includes Kevin
          Bacon.
        </p>

        <h3>Component Design</h3>
        <p>
          This component consists of an input area, where users can type in the
          title of a movie. When users press enter, we use the{" "}
          <Link href="https://www.themoviedb.org/?language=en-US">TMDB</Link>{" "}
          API to try and match the input text to the name of a movie in the API
          database. If no match is found, we display an error message to the
          user and they can try another input.
        </p>
        <p>
          If a match is found, then we make another call to the TMDB API to get
          the cast and crew of the movie the user has entered. If there is a
          connection, then we update the game state with the connections.
        </p>
        <p>
          This game takes advantage of the{" "}
          <Link href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">
            Route Handlers{" "}
          </Link>
          NextJS feature in order to have the client make requests to the server
          in order to interact with the TMDB API. This increases the security of
          the application since the front-end client never directly makes
          requests to the API and therefore never leaks the API key.
        </p>

        <h3>Component</h3>

        <div className="movie-component-container">
          <div className="movie-component">
            <div className="score">
              <div>Degrees of Separation: {movieTitles.length}</div>
              <div>Time: {seconds}</div>
              <button onClick={start}>Start</button>
              <div>
                {kevinBacon ? (
                  <div>
                    <p>You Win!</p>
                    <p>{`Kevin Bacon appears in ${
                      movieTitles[movieTitles.length - 1]
                    }`}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + 59);
                  setMovieTitles(["Barbie"]);
                  setCastCrewConnections([]);
                  setError("");
                  setInputText("");
                  setFullListOfCastCrew([]);
                  setStarterCastCrew([]);
                  loadStarterData();
                  restart(time, false);
                }}
              >
                Restart
              </button>
            </div>

            <form className="input-form" onSubmit={onSubmit}>
              {gameOver == true ? (
                ""
              ) : (
                <input
                  className="movie-input"
                  type="text"
                  value={inputText}
                  onChange={onInputChange}
                />
              )}

              {error && <div className="error-text">{error}</div>}
            </form>
            <div className="movie-titles-container">
              {movieTitles.map((member, index) => {
                return (
                  <div key={index}>
                    <div className="movie-title">{member}</div>

                    {index === movieTitles.length - 1 ? (
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

export default Movies;
