"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Fetching: NextPage = () => {
  type Beer = {
    name: string;
    description: string;
  };

  function App() {
    useEffect(() => {
      fetch("https://api.punkapi.com/v2/beers")
        .then((res) => res.json())
        .then((data) => {
          setBeers(data);
        });
    }, []);

    const [beers, setBeers] = useState<Beer[]>([]);

    const [favorites, setFavorites] = useState<string[]>([]);

    const [inputText, setInputText] = useState<string>("");

    function handleNameClick(beerName: string) {
      if (!favorites.includes(beerName)) {
        setFavorites([...favorites, beerName]);
      } else {
        favorites.splice(favorites.indexOf(beerName), 1);
        setFavorites([...favorites]);
      }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setInputText(e.target.value);
    }

    return (
      <>
        <div>
          <div>
            <input type="text" onChange={handleInputChange}></input>
          </div>
          <div className="beers-container">
            {beers
              .filter((beer) => {
                if (
                  beer.name.includes(inputText) ||
                  beer.description.includes(inputText)
                ) {
                  return true;
                }
              })
              .map((beer) => (
                <p
                  className="individual-beer"
                  onClick={() => handleNameClick(beer.name)}
                >
                  {beer.name}
                  {favorites.includes(beer.name) ? "*" : ""}
                </p>
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      </Head>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Data Fetching Component</h2>
            </div>
          </div>
        </div>
        <h3>Introduction</h3>
        <p>
          Tic-tac-toe is a classic children's game. On this page we will
          implement the game as a React component.
        </p>
        <p>
          Players alternate taking turns by marking the 3x3 game grid with their
          symbol (X for the first player, O for the second player).
        </p>
        <p>
          A player wins the game by placing three of their symbols in a row,
          down a column, or across a diagonal. If the board is full and no
          player has won, the game is a draw.
        </p>

        <h3>Component Design</h3>
        <p>
          This component will consist of 9 cells in a 3x3 grid. Clicking on the
          cell will allow the player to place their symbol into the cell. Then
          the computer will take its turn, and pass the turn back to the player.
        </p>

        <h3>Component</h3>

        <div className="component-container">
          <App />
        </div>
      </section>
    </>
  );
};

export default Fetching;
