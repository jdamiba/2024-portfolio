"use client";

import type { NextPage } from "next";
import Head from "next/head";

import { useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Service: NextPage = () => {
  const [activePlayer, setActivePlayer] = useState("x");

  function Square() {
    const [value, setValue] = useState(null);

    function handleClick() {
      setValue("X");
    }

    return (
      <>
        <button onClick={handleClick} className="square">
          {value}
        </button>
      </>
    );
  }

  function Board() {
    return (
      <div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    );
  }

  const TicTacToe = () => {
    return (
      <div className="tictactoe-component-container">
        <Board />
      </div>
    );
  };

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
              <h2>Quicksort React Component</h2>
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
          <TicTacToe />
        </div>
      </section>
    </>
  );
};

export default Service;
