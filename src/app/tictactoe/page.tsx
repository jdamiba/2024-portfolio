"use client";

import type { NextPage } from "next";
import Head from "next/head";

import { useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Service: NextPage = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function Square({ value, onSquareClick }) {
    return (
      <>
        <button onClick={onSquareClick} className="square">
          {value}
        </button>
      </>
    );
  }

  function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(index) {
      if (squares[index] || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[index] = "X";
      } else {
        nextSquares[index] = "O";
      }
      onPlay(nextSquares);
    }

    return (
      <>
        <div className="status">{status}</div>

        <div className="board-row">
          <Square
            onSquareClick={() => {
              handleClick(0);
            }}
            value={squares[0]}
          />
          <Square
            onSquareClick={() => {
              handleClick(1);
            }}
            value={squares[1]}
          />
          <Square
            onSquareClick={() => {
              handleClick(2);
            }}
            value={squares[2]}
          />
        </div>
        <div className="board-row">
          <Square
            onSquareClick={() => {
              handleClick(3);
            }}
            value={squares[3]}
          />
          <Square
            onSquareClick={() => {
              handleClick(4);
            }}
            value={squares[4]}
          />
          <Square
            onSquareClick={() => {
              handleClick(5);
            }}
            value={squares[5]}
          />
        </div>
        <div className="board-row">
          <Square
            onSquareClick={() => {
              handleClick(6);
            }}
            value={squares[6]}
          />
          <Square
            onSquareClick={() => {
              handleClick(7);
            }}
            value={squares[7]}
          />
          <Square
            onSquareClick={() => {
              handleClick(8);
            }}
            value={squares[8]}
          />
        </div>
      </>
    );
  }

  const TicTacToe = () => {
    return (
      <>
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </>
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
              <h2>Tic Tac Toe Component</h2>
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
